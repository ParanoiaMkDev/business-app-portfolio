import {readFileSync,existsSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
const root=fileURLToPath(new URL('../',import.meta.url));
let count=0;
for(const page of ['index.html','bodega/index.html','turno/index.html','trazo/index.html']){
 const path=resolve(root,page),html=readFileSync(path,'utf8');
 for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){
  const href=match[1].split('#')[0];if(!href||href.startsWith('http'))continue;
  assert(existsSync(resolve(dirname(path),href)),page+' has a missing target: '+href);count++;
 }
}
console.log('Static HTML references verified: '+count);
