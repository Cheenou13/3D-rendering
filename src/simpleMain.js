import { GUI } from "dat.gui"
import { DisplayModels } from "./src/Display"
import { CreatePlanes } from './src/plateForm/models/plane'
import { CreateLine } from "./src/plateForm/models/LineGenerator"
import { transform } from "./src/plateForm/systemControls/TransformControl"
import * as THREE from 'three'
// import DragControls from 'drag-controls'
// import * as THREE from 'three'
// DragControls.install({THREE: THREE})
async function main() {

  const model = 'importedModels/model.gltf'
  const oilTank = 'importedModels/old_oil_tank_.2/scene.gltf'
  const guiControl = new GUI()
  const device = new DisplayModels(document)
  const planexGenerator = new CreatePlanes()
  const lineGenerator = new CreateLine()
  const line = lineGenerator.getLine()
  // const lineControler = new GUI()
  const texturePlane = planexGenerator.loadTexturePlane('importedModels/screenBackground/metalMapping.jpeg')
  const car1 = await device.loadnig(model)
  const car2 = await device.loadnig(model)
  const car3 = await device.loadnig(model)
  const textPlane = planexGenerator.getTextPlane('loading')
  const textPlane2 = planexGenerator.getTextPlane('loading')
  const textPlane3 = planexGenerator.getTextPlane('loading')
  const transformControls = device.getTransformControl()
  const objects = new THREE.Group()

  car2.position.set(-2.28, -1.38, 2.78)
  car2.rotation.set(-1.55, 0.009, 0.841)
  car3.position.set(2.28, -1.38, -2.78)
  textPlane.position.set(0, 0.426, 0)
  textPlane.rotation.set(0, 0.841, 0)
  textPlane2.position.set(-2.504, 0.426, 2.6)
  textPlane2.rotation.set(0, 0.841, 0)
  textPlane3.position.set(2.504, 0.426, -2.6)
  textPlane3.rotation.set(0, 0.841, 0)
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
  planexGenerator.controlLocation(textPlane3, guiControl, 'Text Plane Position')
  planexGenerator.controlRotation(textPlane3, guiControl, 'Text Plane Rotation')
  // lineGenerator.lengthFolder(lineControler, line, 'Line index 0', 0)
  // lineGenerator.lengthFolder(lineControler, line, 'Line index 1', 1)
  // lineGenerator.lengthFolder(lineControler, line, 'Line index 2', 2)
  objects.add(car1, car2, car3, texturePlane, textPlane, textPlane2, textPlane3)
  device.addToScene(objects)
  transformControls.attach(line)
  // device.addToScene(transformControls)
  device.addToScene(line)

  // transform(transformControls)
  device.display()

}

main().catch((err) => {
  console.log(err)
})