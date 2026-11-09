import { Application, Assets, Container, Graphics, Rectangle, Sprite } from 'pixi.js';
import { validatePlacement } from './placement.js';

// Asset paths are resolved by the game, never by changing the editor export.
export async function mountPlacement(host, raw, { resolveAsset, onAction=()=>{} }={}) {
  const p=validatePlacement(raw);
  if(typeof resolveAsset!=='function')throw Error('Scene requires an asset resolver.');
  const app=new Application();
  await app.init({width:p.canvas.width,height:p.canvas.height,background:'#07101c',antialias:true,autoDensity:true,resolution:Math.min(devicePixelRatio||1,2)});
  host.replaceChildren(app.canvas);
  const stage=new Container(); app.stage.addChild(stage);
  const resources=[];
  try {
    async function loadAsset(key) {
      const url=resolveAsset(key);
      if(!url || typeof url!=='string')throw Error('Unresolved scene asset: '+key);
      const texture=await Assets.load(url);
      resources.push(url);
      return texture;
    }
    if(p.background){
      const bg=new Sprite(await loadAsset(p.background));
      bg.width=p.canvas.width;bg.height=p.canvas.height;stage.addChild(bg);
    }
    for(const o of [...p.objects].sort((a,b)=>a.layer-b.layer)){
      const sp=new Sprite(await loadAsset(o.asset));
      sp.anchor.set(.5);sp.position.set(o.x,o.y);sp.width=o.width;sp.height=o.height;sp.rotation=o.rotation*Math.PI/180;
      stage.addChild(sp);
    }
    // Zones are in absolute logical scene coordinates, not local sprite coordinates.
    function addZone(zone, info){
      const g=new Graphics().rect(0,0,zone.width,zone.height).fill({color:0xffffff,alpha:.001});
      g.position.set(zone.x,zone.y);g.hitArea=new Rectangle(0,0,zone.width,zone.height);g.eventMode='static';g.cursor='pointer';
      g.on('pointertap',()=>onAction(info));stage.addChild(g);
    }
    for(const o of p.objects)addZone(o.touchZone,{kind:'sprite',id:o.id,name:o.name});
    for(const h of p.hotspots||[])addZone(h,{kind:'hotspot',id:h.id,name:h.name,action:h.action});
    let disposed=false;
    return {app, destroy:async()=>{if(disposed)return;disposed=true;app.destroy(true,{children:true});if(host.contains(app.canvas))host.replaceChildren();}};
  } catch(e) {
    app.destroy(true,{children:true});host.replaceChildren();throw e;
  }
}
