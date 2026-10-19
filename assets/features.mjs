// Original business-scope copy. The reference repositories are UI/portfolio
// templates, not the source of a packaged inventory, booking or order system.
export const FEATURES={
 bodega:{
  purpose:'Para una pulpería o tienda que necesita saber qué tiene disponible, registrar lo vendido y detectar cuándo reponer.',
  available:[
   'Catálogo: crear y editar productos, códigos, categorías, precios y mínimos de existencias.',
   'Inventario: sumar o restar unidades y registrar el motivo del ajuste.',
   'Ventas: agregar productos al carrito, cambiar cantidades y descontar existencias al confirmar.',
   'Consulta: revisar ventas, su detalle, los totales y las alertas de reposición.'
  ],
  possible:[
   'Proveedores, órdenes de compra y recepción de mercadería.',
   'Códigos de barras, devoluciones y cierres de caja por turno.',
   'Reportes por período, exportación y manejo de varias sucursales.'
  ]
 },
 turno:{
  purpose:'Para un salón o negocio de servicios que organiza la atención por fecha, profesional y duración del trabajo.',
  available:[
   'Agenda: crear y editar citas por cliente, servicio, profesional, fecha y hora.',
   'Disponibilidad: detectar cruces de horario para un mismo profesional.',
   'Atención: marcar citas como completadas o cancelarlas para liberar el espacio.',
   'Directorio: agregar y editar clientes, notas, servicios, duración y precios.'
  ],
  possible:[
   'Reservas desde una página para clientes y confirmación por el negocio.',
   'Recordatorios por correo o mensajería y lista de espera.',
   'Horarios por profesional, bloqueos, anticipos y reportes de atención.'
  ]
 },
 trazo:{
  purpose:'Para un taller de impresión y rótulos que prepara trabajos por encargo: primero cotiza, luego produce y entrega.',
  available:[
   'Cotización: elegir cliente, agregar conceptos y editar cantidades, precios, descuento y notas.',
   'Propuesta: guardar un borrador, marcarlo como enviado (simulado) y descargar un resumen de texto.',
   'Pedido: aceptar una cotización para crear un único trabajo vinculado.',
   'Producción: avanzar de pendiente a en producción, listo y entregado; consultar clientes y propuestas.'
  ],
  possible:[
   'Fechas de entrega, prioridades y asignación de responsables.',
   'Archivos de diseño, medidas, materiales y aprobación del cliente.',
   'Anticipos, saldos pendientes, costos de materiales y avisos de estado.'
  ]
 }
};
const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function featureMarkup(app,{expanded=false}={}){
 const feature=FEATURES[app];if(!feature)return '';
 const list=items=>'<ul>'+items.map(item=>'<li>'+escape(item)+'</li>').join('')+'</ul>';
 const body=`<div class="scope-content"><p class="scope-purpose">${escape(feature.purpose)}</p><section><h3>Podés probar en esta demo</h3>${list(feature.available)}</section><section class="scope-future"><h3>Posibles ampliaciones · No incluidas</h3>${list(feature.possible)}</section><p class="scope-limit">Las ampliaciones son ideas para un proyecto a medida; requieren desarrollo adicional. Esta demo usa datos ficticios guardados solo en este navegador, sin cuentas, sincronización, pagos, correos ni facturas reales.</p></div>`;
 return expanded?body:`<details class="feature-scope"><summary>Funciones y posibilidades del sistema</summary>${body}</details>`;
}
