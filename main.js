import { GUI } from "dat.gui"
import { DisplayModels } from "./src/Display"
import {CreatePlanes } from './src/plateForm/models/plane'
import { CreateLine } from "./src/plateForm/models/LineGenerator"

async function main(){

  const model = 'importedModels/model.gltf'
  const guiControl = new GUI()
  const device = new DisplayModels(document)
  const planexGenerator = new CreatePlanes()
  const lineGenerator = new CreateLine()
  const line = lineGenerator.getLine()
  const lineControler = new GUI()
  const texturePlane = planexGenerator.loadTexturePlane('importedModels/screenBackground/metalMapping.jpeg')
  
  const car1 = await device.loadnig(model)
  const car2 = await device.loadnig(model)
  const car3 = await device.loadnig(model)
  const textPlane = planexGenerator.getTextPlane('loading')
  car2.position.set(-2.28, -1.38, 2.78)
  car2.rotation.set(-1.55, 0.009, 0.841)
  car3.position.set(2.28, -1.38, -2.78)
  textPlane.position.set(-3.178, 0.841, -2.623)
  textPlane.rotation.set(0, 0.841, 0)
  device.addModelRotation(car1, guiControl, 'Car1 Rotation')
  device.addModelRotation(car2, guiControl, 'Car2 Rotation')
  device.addModelRotation(car3, guiControl, 'Car3 Rotation')
  device.addModelPosition(car1, guiControl, 'Car1 position')
  device.addModelPosition(car2, guiControl, 'car2 position')
  device.addModelPosition(car3, guiControl, 'Car3 Position')
  planexGenerator.controlLocation(texturePlane, guiControl, 'Plane Position')
  planexGenerator.controlRotation(texturePlane, guiControl, 'Plane Rotation')
  planexGenerator.controlSize(texturePlane, guiControl, 'Plane Size')
  planexGenerator.changeFont(textPlane, guiControl, 'text Plane')
  planexGenerator.controlLocation(textPlane, guiControl, 'Text Plane Position')
  planexGenerator.controlRotation(textPlane, guiControl, 'Text Plane Rotation')
  lineGenerator.lengthFolder(lineControler, line, 'Line index 0', 0)
  lineGenerator.lengthFolder(lineControler, line, 'Line index 1', 1)
  lineGenerator.lengthFolder(lineControler, line, 'Line index 2', 2)
  lineGenerator.positionFolder(lineControler, line, 'Line Position')
  lineGenerator.rotationFolder(lineControler, line, 'Line Rotation')
  device.addToScene(car1)
  device.addToScene(car2)
  device.addToScene(car3)
  device.addToScene(texturePlane)
  device.addToScene(textPlane)
  device.addToScene(line)

  device.display ()

  
}

main().catch((err) => {
  console.log(err)
})