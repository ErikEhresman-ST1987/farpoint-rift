import test from 'node:test';import assert from 'node:assert/strict';import {validatePlacement} from '../src/scene/placement.js';import fixture from '../src/scenes/integration-sample.json' with {type:'json'};
test('accepts v1 editor placement',()=>assert.equal(validatePlacement(fixture).format,'game-graphics-placement'));
test('rejects editable project',()=>assert.throws(()=>validatePlacement({...fixture,format:'game-graphics-workshop-scene'})));
test('rejects duplicate IDs',()=>assert.throws(()=>validatePlacement({...fixture,hotspots:[{...fixture.hotspots[0],id:'console_1'}]})));
