import './style.css'
import { CreatePlanes } from './src/plateForm/models/plane';
import { DisplayModels } from "./src/Display";
import { GUI } from 'dat.gui';

// document.querySelector('#app').innerHTML = `
// //   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// // `

const model = 'importedModels/model.gltf'
const guiControl = new GUI()
async function main(){

  const device = new DisplayModels(document)
  const planexGenerator = new CreatePlanes()
  const texturePlane = planexGenerator.loadTexturePlane('importedModels/screenBackground/techBackground.jpg')
  
  const model3D = await device.loadnig(model)
  const car2 = await device.loadnig(model)
  const car3 = await device.loadnig(model)
  car2.position.set(-2.28, -1.45, 2.78)
  car2.rotation.set(-1.55, 0.009, 0.841)
  car3.position.set(2.28, -1.45, -2.78)
  device.addModelRotation(model3D, guiControl, 'Car1 Rotation')
  device.addModelRotation(car2, guiControl, 'Car2 Rotation')
  device.addModelRotation(car3, guiControl, 'Car3 Rotation')
  device.addModelPosition(model3D, guiControl, 'Car1 position')
  device.addModelPosition(car2, guiControl, 'car2 position')
  device.addModelPosition(car3, guiControl, 'Car3 Position')
  planexGenerator.controlLocation(texturePlane, guiControl)
  planexGenerator.controlRotation(texturePlane, guiControl)
  planexGenerator.controlSize(texturePlane, guiControl)
  device.addToScene(model3D)
  device.addToScene(car2)
  device.addToScene(car3)
  device.addToScene(texturePlane)

  device.display ()

  
}

main().catch((err) => {
  console.log(err)
})