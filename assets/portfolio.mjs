import {featureMarkup} from './features.mjs';
document.querySelectorAll('[data-demo-scope]').forEach(target=>{target.innerHTML=featureMarkup(target.dataset.demoScope);});
const dialog=document.querySelector('#brief-dialog'),form=document.querySelector('#brief-form'),result=document.querySelector('#brief-result');
let opener;
document.querySelectorAll('[data-brief]').forEach(button=>button.addEventListener('click',()=>{opener=button;form.hidden=false;result.hidden=true;document.querySelector('#copy-status').textContent='';dialog.showModal();}));
document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>dialog.close()));
dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));
form.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form);const need=String(data.get('need')).trim();if(!need)return;document.querySelector('#brief-copy').value=`Hola, me gustaría conversar sobre una aplicación para mi negocio.\n\nTipo de negocio: ${data.get('business')}\n\nLo que quiero simplificar:\n${need}\n\nMe gustaría ver una propuesta para computadora y teléfono.`;form.hidden=true;result.hidden=false;document.querySelector('#brief-copy').focus();});
document.querySelector('#copy-brief').addEventListener('click',async()=>{const field=document.querySelector('#brief-copy'),status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText(field.value);status.textContent='Resumen copiado. Podés compartirlo por el medio que prefirás.';}catch{field.focus();field.select();status.textContent='Seleccionamos el texto para que lo copiés manualmente.';}});
