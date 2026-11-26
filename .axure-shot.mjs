import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const PORT = 9361;
const prof = path.join(process.cwd(), '.edge-ax-' + Date.now());
const proc = spawn(EDGE, [`--remote-debugging-port=${PORT}`,'--headless','--disable-gpu','--no-sandbox',`--user-data-dir=${prof}`,'--window-size=1920,1200','--no-first-run','--hide-scrollbars','--allow-file-access-from-files','about:blank'], { stdio:['ignore','pipe','pipe'], windowsHide:true });
let log=''; proc.stderr.on('data',d=>log+=d); proc.stdout.on('data',d=>log+=d);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function getWs(){for(let i=0;i<80;i++){try{const r=await fetch(`http://127.0.0.1:${PORT}/json/list`);const l=await r.json();const p=l.find(t=>t.type==='page');if(p)return p.webSocketDebuggerUrl;}catch(e){}await sleep(300);}console.log(log.slice(0,1000));throw new Error('no ws');}
const ws=new WebSocket(await getWs()); await new Promise(r=>ws.onopen=r);
let id=0;const pend=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id);}};
const send=(method,params={})=>new Promise(res=>{const i=++id;pend.set(i,res);ws.send(JSON.stringify({id:i,method,params}));});
await send('Page.enable'); await send('Runtime.enable');
const url=process.env.URL;
await send('Page.navigate',{url}); await sleep(Number(process.env.WAIT||3500));
const expr=process.env.EXPR;
if(expr){const r=await send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true});console.log(JSON.stringify(r.result.result.value??r.result,null,1).slice(0,4000));}
const shots=JSON.parse(process.env.SHOTS||'[]');
for(const s of shots){const clip=s.clip?{x:s.clip[0],y:s.clip[1],width:s.clip[2],height:s.clip[3],scale:1}:undefined;const r=await send('Page.captureScreenshot',{format:s.fmt||'jpeg',quality:92,...(clip?{clip}:{})});fs.writeFileSync(path.join(process.cwd(),'.shots',s.name+'.'+(s.fmt||'jpeg')),Buffer.from(r.result.data,'base64'));console.log('shot',s.name);}
ws.close();proc.kill();
