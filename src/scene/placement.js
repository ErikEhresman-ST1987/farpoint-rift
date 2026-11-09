// Scene Editor game-placement format v1. No editor-specific changes required.
export function validatePlacement(p) {
  if (!p || p.format !== 'game-graphics-placement' || p.version !== 1) throw Error('Expected Scene Editor game-placement JSON v1.');
  const c=p.canvas;
  if (!c || !Number.isInteger(c.width) || !Number.isInteger(c.height) || c.width<100 || c.height<100 || c.width>4096 || c.height>4096) throw Error('Invalid logical scene dimensions.');
  if (!Array.isArray(p.objects) || p.objects.length>100) throw Error('Invalid scene objects.');
  if (p.hotspots!==undefined && (!Array.isArray(p.hotspots)||p.hotspots.length>100)) throw Error('Invalid background hotspots.');
  const ids=new Set();
  const rect=(r)=>r && r.type==='rectangle' && [r.x,r.y,r.width,r.height].every(Number.isFinite) && r.width>0 && r.height>0;
  for(const h of p.hotspots||[]){
    if(!h || typeof h.id!=='string'||!h.id||ids.has(h.id)||typeof h.action!=='string'||!h.action||!rect(h)||h.x<0||h.y<0||h.x+h.width>c.width+1||h.y+h.height>c.height+1)throw Error('Invalid background hotspot.');
    ids.add(h.id);
  }
  for(const o of p.objects){
    if(!o || typeof o.id!=='string'||!o.id||ids.has(o.id)||typeof o.asset!=='string'||!o.asset||![o.x,o.y,o.width,o.height,o.rotation,o.layer].every(Number.isFinite)||o.width<=0||o.height<=0||!rect(o.touchZone))throw Error('Invalid scene sprite.');
    ids.add(o.id);
  }
  if(p.background!==null && p.background!==undefined && typeof p.background!=='string')throw Error('Invalid background asset.');
  return p;
}
