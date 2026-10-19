// UI-only walkthroughs: navigation never creates, edits, or resets demo records.
const common=[
 {selector:'.sidebar-brand',title:'Una demostración para explorar',text:'Los negocios y datos son ficticios. Tus cambios quedan solo en este navegador; no hay pagos, mensajes ni reservas reales.'},
];
const steps={
 bodega:[
  {route:'inventario',selector:'[data-action="product-new"]',title:'1. Revisá tu inventario',text:'Buscá productos, agregá uno o editá sus datos. Ajustar permite sumar o restar existencias con un motivo.'},
  {route:'venta',selector:'.pos-layout',title:'2. Registrá una venta de prueba',text:'Elegí productos del catálogo, ajustá las cantidades y confirmá la venta. Al confirmar, se descuenta el inventario; no se cobra dinero.'},
  {route:'ventas',selector:'.page-heading',title:'3. Consultá los movimientos',text:'Las ventas registradas aparecen aquí con su detalle. En Inventario también podés revisar el resultado de los ajustes.'}
 ],
 turno:[
  {route:'clientes',selector:'[data-action="client-new"]',title:'1. Agregá un cliente ficticio',text:'Guardá un nombre y contacto de ejemplo para usarlo al crear una cita.'},
  {route:'servicios',selector:'.page-heading',title:'2. Definí tus servicios',text:'Cada servicio tiene precio y duración. La duración se utiliza para detectar cruces en la agenda.'},
  {route:'agenda',selector:'.page-heading',title:'3. Organizá la agenda',text:'Creá una cita y elegí cliente, servicio, profesional, fecha y hora. Podés editarla, completarla o cancelarla. No se envían recordatorios reales.'}
 ],
 trazo:[
  {route:'cotizaciones/nueva',selector:'#quote-form',title:'1. Cotizá el trabajo',text:'Para un rótulo o material impreso, elegí cliente y conceptos, ajustá cantidades y precios, aplicá un descuento y guardá el borrador.'},
  {route:'cotizaciones',selector:'.page-heading',title:'2. Aprobá la propuesta',text:'Abrí Ver detalle en una cotización. Podés marcarla como enviada (simulado) y aceptar para crear un único pedido vinculado.'},
  {route:'pedidos',selector:'.page-heading',title:'3. Seguí la producción',text:'Cada pedido avanza de pendiente a producción, listo y entregado. Conserva el vínculo con su cotización para consultar lo acordado.'}
 ]
};
let active;
export function startTutorial(app){
 if(!steps[app])return;
 active?.close();
 const opener=document.activeElement,initialHash=location.hash;
 const dialog=document.createElement('dialog');dialog.className='tutorial-dialog';
 dialog.setAttribute('aria-labelledby','tutorial-title');dialog.setAttribute('aria-describedby','tutorial-text');
 document.body.append(dialog);active=dialog;
 const sequence=[...common,...steps[app],{selector:'[data-action="reset"]',title:'Listo para probar',text:'Restablecer demo recupera los datos ficticios iniciales de este sistema. Podés repetir este recorrido desde Ayuda.'}];
 let index=0,target,epoch=0;
 const unmark=()=>{target?.classList.remove('tutorial-target');target=null;};
 const position=()=>{
  const width=Math.min(window.innerWidth,document.documentElement.clientWidth||window.innerWidth);
  const height=Math.min(window.innerHeight,document.documentElement.clientHeight||window.innerHeight);
  dialog.style.maxWidth=Math.max(0,width-24)+'px';
  const rect=target?.getBoundingClientRect(),size=dialog.getBoundingClientRect();
  const below=rect&&rect.bottom+12+size.height<height-12;
  dialog.style.left=Math.max(12,Math.min(rect?.left??(width-size.width)/2,width-size.width-12))+'px';
  dialog.style.top=Math.max(12,Math.min(below?rect.bottom+12:rect?rect.top-size.height-12:(height-size.height)/2,height-size.height-12))+'px';
 };
 const show=async()=>{
  const token=++epoch;unmark();const step=sequence[index];
  if(step.route&&location.hash!=='#'+step.route){location.hash=step.route;await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));}
  if(token!==epoch||!dialog.open)return;
  target=document.querySelector(step.selector);target?.classList.add('tutorial-target');target?.scrollIntoView({block:'center',behavior:'instant'});
  dialog.replaceChildren();
  const progress=document.createElement('p');progress.className='tutorial-progress';progress.textContent=`RECORRIDO · ${index+1} DE ${sequence.length}`;
  const title=document.createElement('h2');title.id='tutorial-title';title.textContent=step.title;
  const text=document.createElement('p');text.id='tutorial-text';text.textContent=step.text;
  const actions=document.createElement('div');actions.className='tutorial-actions';
  const button=(label,handler,primary=false)=>{const b=document.createElement('button');b.type='button';b.className='button '+(primary?'primary':'secondary');b.textContent=label;b.addEventListener('click',handler);actions.append(b);return b;};
  button('Cerrar',()=>dialog.close());if(index>0)button('Anterior',()=>{index--;show();});
  const next=button(index===sequence.length-1?'Finalizar':'Siguiente',()=>{if(index===sequence.length-1)dialog.close();else{index++;show();}},true);
  dialog.append(progress,title,text,actions);position();next.focus({preventScroll:true});
 };
 const reposition=()=>{if(dialog.open)position();};
 dialog.addEventListener('close',()=>{epoch++;unmark();window.removeEventListener('resize',reposition);window.removeEventListener('scroll',reposition);dialog.remove();if(active===dialog)active=null;if(location.hash===initialHash&&opener?.isConnected)opener.focus({preventScroll:true});else document.querySelector('[data-action="tutorial"]')?.focus({preventScroll:true});},{once:true});
 window.addEventListener('resize',reposition);window.addEventListener('scroll',reposition,{passive:true});
 dialog.showModal();show();
}
