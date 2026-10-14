import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.join(path.dirname(fileURLToPath(import.meta.url)),'dist');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
const server=http.createServer(async(req,res)=>{
  try {
    const pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);
    const requested=path.resolve(root,`.${pathname==='/'?'/index.html':pathname}`);
    if(!requested.startsWith(root+path.sep)){res.writeHead(403).end();return;}
    const contents=await fs.readFile(requested);
    res.writeHead(200,{'Content-Type':types[path.extname(requested)]??'application/octet-stream','X-Content-Type-Options':'nosniff'}).end(contents);
  }catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'}).end('Arquivo não encontrado.');}
});
server.listen(4173,'127.0.0.1',()=>console.log('Prévia local: http://127.0.0.1:4173/'));
