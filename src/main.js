import './style.css';
import { mountPlacement } from './scene/scene-loader.js';
import fixture from './scenes/integration-sample.json';
const host=document.querySelector('#scene'),status=document.querySelector('#status');
let active=null;
const assets={
  'REPLACE_WITH_GAME_BACKGROUND_ASSET_PATH':import.meta.env.BASE_URL+'assets/sample-background.svg',
  'REPLACE_WITH_GAME_ASSET_PATH/sample-console.svg':import.meta.env.BASE_URL+'assets/sample-console.svg'
};
async function show(){
  status.textContent='Loading scene…';
  try{
    if(active)await active.destroy();
    active=await mountPlacement(host,fixture,{
      resolveAsset:key=>assets[key],
      onAction:info=>{status.textContent=info.kind==='hotspot'?'Hotspot '+info.id+' → '+info.action:'Sprite '+info.id+' tapped';}
    });
    status.textContent='Ready. Tap the console or the background hotspot.';
  }catch(error){status.textContent='Scene error: '+error.message;console.error(error);}
}
document.querySelector('#reset-view').addEventListener('click',show);
show();
