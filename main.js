import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui'
import { planeObject, CreatePlanes } from './src/plateForm/models/plane';
import { createLights } from './src/plateForm/components/light';
import { throttle } from 'lodash-es';
import { DisplayModels } from "./src/Display";
import { GUI } from 'dat.gui';

// document.querySelector('#app').innerHTML = `
// //   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// // `

const model = 'importedModels/model.gltf'
const guiControl = new GUI()
async function main(){

  const play = new DisplayModels(document)
  const model3D = await play.loadnig(model)
  play.addModelRotation(model3D, guiControl)
  play.addModelPosition(model3D, guiControl)
  play.addToScene(model3D)

  play.display ()

  
}

main().catch((err) => {
  console.log(err)
})
