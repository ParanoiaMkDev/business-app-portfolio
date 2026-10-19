import test from 'node:test';
import assert from 'node:assert/strict';
import { createData, issueSale, adjustStock, makeAppointment, quoteTotals, acceptQuote, total, price, normalize } from '../assets/model.mjs';

const date = '2026-10-19';

test('sale calculates cents, reduces stock, preserves source, and refuses overselling', () => {
  const state = createData('bodega', date), before = structuredClone(state);
  const next = issueSale(state, [{ productId: 'p1', quantity: 2 }, { productId: 'p2', quantity: 1 }], 'V-test', date, '12:00');
  assert.equal(next.sales[0].total, 29900);
  assert.equal(next.products.find(p => p.id === 'p1').stock, 22);
  assert.equal(next.products.find(p => p.id === 'p2').stock, 4);
  assert.equal(next.sales[0].lines.length, 2);
  assert.deepEqual(state, before);
  assert.throws(() => issueSale(state, [{ productId: 'p1', quantity: 25 }], 'bad'));
  assert.throws(() => issueSale(state, [{ productId: 'p1', quantity: 1 }, { productId: 'p1', quantity: 1 }], 'bad'));
  assert.throws(() => issueSale(state, [], 'bad'));
  assert.deepEqual(state, before);
});

test('stock accepts negative adjustment to zero and enforces integer bounds', () => {
  const state = createData('bodega', date), before = structuredClone(state);
  const next = adjustStock(state, 'p1', -24, ' Conteo físico ', 'M-test', date);
  assert.equal(next.products[0].stock, 0);
  assert.equal(next.movements[0].change, -24);
  assert.equal(next.movements[0].reason, 'Conteo físico');
  assert.equal(adjustStock(state, 'p1', 999975, 'Límite', 'M-max').products[0].stock, 999999);
  for (const change of [-25, 999976, 0, 0.5, NaN]) assert.throws(() => adjustStock(state, 'p1', change, '', 'bad'));
  assert.deepEqual(state, before);
});

test('appointments reject same staff/date overlap, allow adjacency and ignore cancellations', () => {
  const state = createData('turno', date), before = structuredClone(state);
  const input = { clientId: 'c1', serviceId: 's1', staff: 'Valeria', date, time: '09:30' };
  assert.throws(() => makeAppointment(state, input, 'new'));
  assert.equal(makeAppointment(state, { ...input, time: '10:00' }, 'adjacent').appointments.at(-1).time, '10:00');
  assert.equal(makeAppointment(state, { ...input, time: '08:00' }, 'before').appointments.at(-1).time, '08:00');
  assert.equal(makeAppointment(state, { ...input, staff: 'Diego' }, 'staff').appointments.at(-1).staff, 'Diego');
  assert.equal(makeAppointment(state, { ...input, date: '2026-10-20' }, 'date').appointments.at(-1).date, '2026-10-20');
  const cancelled = structuredClone(state);
  cancelled.appointments[0].status = 'Cancelada';
  assert.equal(makeAppointment(cancelled, input, 'cancelled').appointments.at(-1).time, '09:30');
  assert.deepEqual(state, before);
});

test('quote totals apply discounts and round fractional quantities and discounts to cents', () => {
  const lines = [{ name: 'Servicio', quantity: 1.5, price: 101 }, { name: 'Material', quantity: 2, price: 100 }];
  assert.deepEqual(quoteTotals(lines, 10), { subtotal: 352, discountAmount: 35, total: 317 });
  assert.deepEqual(quoteTotals([{ name: 'Uno', quantity: 1, price: 101 }], 50), { subtotal: 101, discountAmount: 51, total: 50 });
  assert.equal(quoteTotals(lines, 100).total, 0);
  for (const discount of [-1, 101, NaN, Infinity]) assert.throws(() => quoteTotals(lines, discount));
  assert.throws(() => quoteTotals([]));
  for (const line of [{ name: '', quantity: 1, price: 100 }, { name: 'X', quantity: 0, price: 100 }, { name: 'X', quantity: Infinity, price: 100 }, { name: 'X', quantity: 1, price: -1 }, { name: 'X', quantity: 1, price: 1.5 }]) assert.throws(() => quoteTotals([line]));
});

test('quote acceptance creates linked order, preserves source, and refuses duplicate acceptance', () => {
  const state = createData('trazo', date), before = structuredClone(state);
  const next = acceptQuote(state, 'C-103', 'P-test');
  assert.equal(next.quotes.find(q => q.id === 'C-103').status, 'Aceptada');
  assert.deepEqual({ ...next.orders[0], date: 'dynamic' }, { id: 'P-test', quoteId: 'C-103', clientId: 'c2', date: 'dynamic', status: 'Pendiente', note: '' });
  assert.throws(() => acceptQuote(next, 'C-103', 'P-duplicate'));
  assert.throws(() => acceptQuote(state, 'C-104', 'P-existing'));
  assert.throws(() => acceptQuote(state, 'missing', 'P-missing'));
  assert.deepEqual(state, before);
});

test('every seeded sale total equals its line amounts', () => {
  for (const sale of createData('bodega', date).sales) assert.equal(sale.total, total(sale.lines), sale.id);
});

test('price parsing uses exact valid cents and normalization removes accents', () => {
  for (const [value, expected] of [['0', 0], [' 12.34 ', 1234], ['1.01', 101], [42, 4200], ['999999', 99999900]]) assert.equal(price(value), expected);
  for (const value of ['', ' ', '-1', '1.001', 'texto', 'Infinity', '1000000']) assert.throws(() => price(value));
  assert.equal(normalize('  CAFÉ, Jabón y NIÑEZ  '), 'cafe, jabon y ninez');
  assert.equal(normalize(null), '');
});
