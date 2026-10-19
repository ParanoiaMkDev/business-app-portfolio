export const money=cents=>'C$'+new Intl.NumberFormat('es-NI',{minimumFractionDigits:2,maximumFractionDigits:2}).format(cents/100);
export const normalize=value=>String(value??'').normalize('NFKD').replace(/\p{M}/gu,'').toLocaleLowerCase('es-NI').trim();
export const today=()=>{const d=new Date();return`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
export const clone=value=>structuredClone(value);
export const total=lines=>lines.reduce((sum,line)=>sum+Math.round(line.price*line.quantity),0);
const fail=message=>{throw Error(message);};
export function price(value){const n=Number(value),cents=Math.round(n*100);if(String(value).trim()===''||!Number.isFinite(n)||n<0||cents>99999900||Math.abs(n*100-cents)>1e-6)fail('Ingresá un precio válido, con un máximo de dos decimales.');return cents;}
export function createData(app,date=today()){
 if(app==='bodega')return{version:1,products:[
 {id:'p1',name:'Arroz blanco 2 kg',sku:'ALI-001',category:'Alimentos',stock:24,minimum:8,price:9200,tone:'sand',unit:'paquete'},
 {id:'p2',name:'Café molido 250 g',sku:'ALI-002',category:'Alimentos',stock:5,minimum:8,price:11500,tone:'brown',unit:'bolsa'},
 {id:'p3',name:'Aceite vegetal 1 L',sku:'ALI-003',category:'Alimentos',stock:18,minimum:6,price:7800,tone:'gold',unit:'botella'},
 {id:'p4',name:'Leche entera 1 L',sku:'BEB-001',category:'Bebidas',stock:32,minimum:10,price:4200,tone:'blue',unit:'caja'},
 {id:'p5',name:'Jabón de manos 250 ml',sku:'HOG-001',category:'Hogar',stock:14,minimum:5,price:6500,tone:'green',unit:'botella'},
 {id:'p6',name:'Galletas de avena',sku:'ALI-004',category:'Alimentos',stock:4,minimum:6,price:3800,tone:'peach',unit:'paquete'},
 {id:'p7',name:'Agua purificada 1 L',sku:'BEB-002',category:'Bebidas',stock:45,minimum:12,price:2000,tone:'aqua',unit:'botella'},
 {id:'p8',name:'Detergente 500 g',sku:'HOG-002',category:'Hogar',stock:20,minimum:6,price:5600,tone:'purple',unit:'bolsa'}
 ],sales:[{id:'V-003',date,at:'11:42',lines:[{name:'Arroz blanco 2 kg',price:9200,quantity:5},{name:'Café molido 250 g',price:11500,quantity:2}],total:69000},{id:'V-002',date,at:'10:15',lines:[{name:'Leche entera 1 L',price:4200,quantity:10},{name:'Agua purificada 1 L',price:2000,quantity:12}],total:66000},{id:'V-001',date,at:'09:08',lines:[{name:'Arroz blanco 2 kg',price:9200,quantity:15},{name:'Aceite vegetal 1 L',price:7800,quantity:10},{name:'Jabón de manos 250 ml',price:6500,quantity:3},{name:'Galletas de avena',price:3800,quantity:3},{name:'Agua purificada 1 L',price:2000,quantity:1},{name:'Leche entera 1 L',price:4200,quantity:2},{name:'Detergente 500 g',price:5600,quantity:2}],total:268500}],movements:[]};
 if(app==='turno')return{version:1,clients:[{id:'c1',name:'Mariana López',contact:'0000-0101',note:'Prefiere horario de mañana'},{id:'c2',name:'Lucía Martínez',contact:'0000-0102',note:''},{id:'c3',name:'Daniela Reyes',contact:'0000-0103',note:'Primera visita'}],services:[{id:'s1',name:'Corte + secado',duration:60,price:45000},{id:'s2',name:'Manicure',duration:45,price:30000},{id:'s3',name:'Tratamiento capilar',duration:90,price:65000},{id:'s4',name:'Peinado',duration:45,price:35000}],staff:['Valeria','Diego'],appointments:[{id:'a1',clientId:'c1',serviceId:'s1',staff:'Valeria',date,time:'09:00',status:'Confirmada',note:''},{id:'a2',clientId:'c2',serviceId:'s2',staff:'Diego',date,time:'10:30',status:'Confirmada',note:''},{id:'a3',clientId:'c3',serviceId:'s3',staff:'Valeria',date,time:'13:00',status:'Confirmada',note:'Primera visita'},{id:'a4',clientId:'c1',serviceId:'s4',staff:'Diego',date,time:'15:30',status:'Completada',note:''}]};
 if(app==='trazo')return{version:1,clients:[{id:'c1',name:'Café Aurora',contact:'hola@aurora.example',note:'Rótulos y material de marca'},{id:'c2',name:'Tienda Roble',contact:'compras@roble.example',note:''},{id:'c3',name:'Estudio Luna',contact:'equipo@luna.example',note:''}],catalog:[{id:'q1',name:'Rótulo personalizado',price:240000},{id:'q2',name:'Diseño + instalación',price:80000},{id:'q3',name:'Tarjetas de presentación (100)',price:45000},{id:'q4',name:'Vinil para vitrina',price:125000}],quotes:[{id:'C-104',clientId:'c1',date,lines:[{name:'Rótulo personalizado',quantity:1,price:240000},{name:'Diseño + instalación',quantity:1,price:80000}],discount:0,note:'Acabado mate. Entrega por coordinar.',status:'Aceptada'},{id:'C-103',clientId:'c2',date,lines:[{name:'Vinil para vitrina',quantity:2,price:125000}],discount:5,note:'',status:'Enviada'},{id:'C-102',clientId:'c3',date,lines:[{name:'Tarjetas de presentación (100)',quantity:3,price:45000}],discount:0,note:'',status:'Borrador'}],orders:[{id:'P-021',quoteId:'C-104',clientId:'c1',date,status:'En producción',note:'Acabado mate. Entrega por coordinar.'}]};
 fail('Demo no disponible.');
}
export function issueSale(state,cart,id,date=today(),at=new Date().toLocaleTimeString('es-NI',{hour:'2-digit',minute:'2-digit',hour12:false})){
 if(!cart.length)fail('Agregá al menos un producto a la venta.');
 if(new Set(cart.map(x=>x.productId)).size!==cart.length)fail('El producto está repetido en la venta.');
 const lines=cart.map(row=>{const p=state.products.find(p=>p.id===row.productId);if(!p||!Number.isInteger(row.quantity)||row.quantity<1||row.quantity>p.stock)fail('Revisá las cantidades: no hay suficientes existencias.');return{productId:p.id,name:p.name,price:p.price,quantity:row.quantity};});
 const next=clone(state);for(const row of lines)next.products.find(p=>p.id===row.productId).stock-=row.quantity;
 next.sales.unshift({id,date,at,lines,total:total(lines)});return next;
}
export function adjustStock(state,productId,change,reason,id,date=today()){
 const p=state.products.find(p=>p.id===productId);if(!p||!Number.isInteger(change)||change===0||p.stock+change<0||p.stock+change>999999)fail('El ajuste debe ser un entero distinto de cero y no puede dejar stock negativo.');
 const next=clone(state);next.products.find(p=>p.id===productId).stock+=change;next.movements.unshift({id,productId,name:p.name,change,reason:String(reason).trim().slice(0,100),date});return next;
}
export const minutes=time=>{if(!/^\d{2}:\d{2}$/.test(time))return NaN;const[h,m]=time.split(':').map(Number);return h<24&&m<60?h*60+m:NaN;};
export function makeAppointment(state,input,id){
 const service=state.services.find(s=>s.id===input.serviceId);
 const start=minutes(input.time);if(!service||!state.clients.some(c=>c.id===input.clientId)||!state.staff.includes(input.staff)||!/^\d{4}-\d{2}-\d{2}$/.test(input.date)||!Number.isFinite(Date.parse(input.date+'T12:00:00'))||start<480||!Number.isFinite(start)||start+service.duration>1080)fail('Revisá la cita. El horario de atención es de 8:00 a 18:00.');
 if(state.appointments.some(a=>a.id!==id&&a.date===input.date&&a.staff===input.staff&&a.status!=='Cancelada'&&start<minutes(a.time)+(state.services.find(s=>s.id===a.serviceId)?.duration??0)&&start+service.duration>minutes(a.time)))fail('Ese profesional ya tiene una cita en ese horario. Elegí otro espacio.');
 const next=clone(state),appointment={id,clientId:input.clientId,serviceId:input.serviceId,staff:input.staff,date:input.date,time:input.time,status:'Confirmada',note:String(input.note||'').trim().slice(0,300)};
 const index=next.appointments.findIndex(a=>a.id===id);if(index===-1)next.appointments.push(appointment);else next.appointments[index]=appointment;return next;
}
export function quoteTotals(lines,discount=0){
 if(!lines.length||lines.length>30||!Number.isFinite(discount)||discount<0||discount>100)fail('Agregá conceptos y revisá el descuento (0 a 100%).');
 for(const line of lines)if(!String(line.name).trim()||String(line.name).length>120||!Number.isFinite(line.quantity)||line.quantity<=0||line.quantity>999||!Number.isInteger(line.price)||line.price<0||line.price>99999900)fail('Revisá los nombres, cantidades y precios de la cotización.');
 const subtotal=total(lines),discountAmount=Math.round(subtotal*discount/100);return{subtotal,discountAmount,total:subtotal-discountAmount};
}
export function acceptQuote(state,quoteId,orderId){
 const quote=state.quotes.find(q=>q.id===quoteId);if(!quote)fail('No encontramos la cotización.');
 if(state.orders.some(o=>o.quoteId===quoteId))fail('Esta cotización ya tiene un pedido.');
 const next=clone(state);next.quotes.find(q=>q.id===quoteId).status='Aceptada';next.orders.unshift({id:orderId,quoteId,clientId:quote.clientId,date:today(),status:'Pendiente',note:quote.note});return next;
}
