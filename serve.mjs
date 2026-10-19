import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,sep,extname} from 'node:path';
const root=resolve(fileURLToPath(new URL('.',import.meta.url)));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.json':'application/json; charset=utf-8'};
const port=Number(process.env.PORT||4173);
createServer(async(req,res)=>{try{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 if(pathname.split('/').some(segment=>segment.startsWith('.')&&segment!==''))throw Error('PRIVATE');
 let path=resolve(root,'.'+pathname);
 if(path!==root&&!path.startsWith(root+sep))throw Error('OUTSIDE');
 if((await stat(path)).isDirectory())path=resolve(path,'index.html');
 const data=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)]||'text/plain; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(data);
 }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('No encontrado');}
}).listen(port,'127.0.0.1',()=>console.log(`Portfolio preview: http://127.0.0.1:${port}`));
