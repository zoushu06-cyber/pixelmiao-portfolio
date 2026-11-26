import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const EDGE='C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const PORT=9362;
const prof=path.join(process.cwd(),'.edge-axb-'+Date.now());
const proc=spawn(EDGE,[`--remote-debugging-port=${PORT}`,'--headless','--disable-gpu','--no-sandbox',`--user-data-dir=${prof}`,'--window-size=1920,1200','--no-first-run','--hide-scrollbars','--allow-file-access-from-files','about:blank'],{stdio:['ignore','pipe','pipe'],windowsHide:true});
let log='';proc.stderr.on('data',d=>log+=d);proc.stdout.on('data',d=>log+=d);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function getWs(){for(let i=0;i<80;i++){try{const r=await fetch(`http://127.0.0.1:${PORT}/json/list`);const l=await r.json();const p=l.find(t=>t.type==='page');if(p)return p.webSocketDebuggerUrl;}catch(e){}await sleep(300);}console.log(log.slice(0,1000));throw new Error('no ws');}
const ws=new WebSocket(await getWs());await new Promise(r=>ws.onopen=r);
let id=0;const pend=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id);}};
const send=(method,params={})=>new Promise(res=>{const i=++id;pend.set(i,res);ws.send(JSON.stringify({id:i,method,params}));});
await send('Page.enable');await send('Runtime.enable');
const dir=process.env.DIR;
const pages=JSON.parse(process.env.PAGES);
const W=Number(process.env.W||1444),H=Number(process.env.H||1061);
const CX=Number(process.env.CX||0),CY=Number(process.env.CY||0);
for(const p of pages){
  const url=pathToFileURL(path.join(dir,p.file+'.html')).href;
  await send('Page.navigate',{url});await sleep(Number(process.env.WAIT||3000));
  const r=await send('Runtime.evaluate',{expression:'({w:document.body.scrollWidth,h:document.body.scrollHeight,title:document.title})',returnByValue:true});
  const dim=r.result.result.value;
  const shot=await send('Page.captureScreenshot',{format:'jpeg',quality:90,clip:{x:CX,y:CY,width:W,height:H,scale:1}});
  fs.writeFileSync(path.join(process.cwd(),'.shots',`ax-${p.out}.jpg`),Buffer.from(shot.result.data,'base64'));
  console.log(p.out,dim.w+'x'+dim.h,'saved',W+'x'+H);
}
ws.close();proc.kill();
