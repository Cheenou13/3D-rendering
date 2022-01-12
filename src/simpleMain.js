import { GUI } from "dat.gui"
import { DisplayModels } from "./src/Display"
import {CreatePlanes } from './src/plateForm/models/plane'
async function main(){

  const model = 'importedModels/model.gltf'
  const guiControl = new GUI()
  const device = new DisplayModels(document)
  const planexGenerator = new CreatePlanes()
  const texturePlane = planexGenerator.loadTexturePlane('importedModels/screenBackground/metalMapping.jpeg')
  
  const car1 = await device.loadnig(model)
  const car2 = await device.loadnig(model)
  const car3 = await device.loadnig(model)
  car2.position.set(-2.28, -1.38, 2.78)
  car2.rotation.set(-1.55, 0.009, 0.841)
  car3.position.set(2.28, -1.38, -2.78)
  device.addModelRotation(car1, guiControl, 'Car1 Rotation')
  device.addModelRotation(car2, guiControl, 'Car2 Rotation')
  device.addModelRotation(car3, guiControl, 'Car3 Rotation')
  device.addModelPosition(car1, guiControl, 'Car1 position')
  device.addModelPosition(car2, guiControl, 'car2 position')
  device.addModelPosition(car3, guiControl, 'Car3 Position')
  planexGenerator.controlLocation(texturePlane, guiControl, 'Plane Position')
  planexGenerator.controlRotation(texturePlane, guiControl, 'Plane Rotation')
  planexGenerator.controlSize(texturePlane, guiControl)
  device.addToScene(car1)
  device.addToScene(car2)
  device.addToScene(car3)
  device.addToScene(texturePlane)

  device.display ()

  
}

main().catch((err) => {
  console.log(err +' has occur')
})