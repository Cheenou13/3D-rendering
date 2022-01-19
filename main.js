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
  const guiControl = new GUI()
  // const oilTankFolder = new GUI()
  const device = new DisplayModels(document)
  const planexGenerator = new CreatePlanes()
  const lineGenerator = new CreateLine()
  const line = lineGenerator.getLine()
  // const lineControler = new GUI()
  const texturePlane = planexGenerator.loadTexturePlane('importedModels/screenBackground/metalMapping.jpeg')
  const objects = await device.loadnig()
  console.log(objects)
  // const oilMachine = await device.loadnig(oilTank)
  // const car3 = await device.loadnig(model)
  // const textPlane = planexGenerator.getTextPlane('loading')
  // const textPlane2 = planexGenerator.getTextPlane('loading')
  // const textPlane3 = planexGenerator.getTextPlane('loading')

  // const oilTankSize = oilTankFolder.addFolder('oil Tank Size')
  // const oilTankPos = oilTankFolder.addFolder('Oil Tank Position')
  // const oilTankRot = oilTankFolder.addFolder('Oil Tank Rotation')

  // oilTankPos.add(oilMachine.position, 'x', -100, 100, 0.001)
  // oilTankPos.add(oilMachine.position, 'y', -100, 100, 0.001)
  // oilTankPos.add(oilMachine.position, 'z', -100, 100, 0.001)

  // oilMachine.scale.set(0.01, 0.01, 0.01)
  // oilTankSize.add(oilMachine.scale, 'x', -1000, 1000, 0.01)
  // oilTankSize.add(oilMachine.scale, 'y', -1000, 1000, 0.01)
  // oilTankSize.add(oilMachine.scale, 'z', -1000, 1000, 0.01)

  // oilMachine.position.set(-6.462, -1.38, 4.17)
  // oilMachine.rotation.set(-1.563, 0.009, 2.452)
  
  // car3.position.set(2.28, -1.38, -2.78)
  // textPlane.position.set(0, 0.426, 0)
  // textPlane.rotation.set(0, 0.841, 0)
  // textPlane2.position.set(-2.504, 0.426, 2.6)
  // textPlane2.rotation.set(0, 0.841, 0)
  // textPlane3.position.set(2.504, 0.426, -2.6)
  // textPlane3.rotation.set(0, 0.841, 0)
  device.addModelRotation(objects.children[0], guiControl, 'OilTank1 Rotation')
  // device.addModelRotation(car3, guiControl, 'Car3 Rotation')
  device.addModelPosition(objects.children[0], guiControl, 'OilTank1 position')
  // device.addModelPosition(car3, guiControl, 'Car3 Position')
  // planexGenerator.controlLocation(texturePlane, guiControl, 'Plane Position')
  // planexGenerator.controlRotation(texturePlane, guiControl, 'Plane Rotation')
  planexGenerator.controlSize(texturePlane, guiControl, 'Plane Size')
  // planexGenerator.changeFont(textPlane, guiControl, 'text Plane')
  // planexGenerator.controlLocation(textPlane3, guiControl, 'Text Plane Position')
  // planexGenerator.controlRotation(textPlane3, guiControl, 'Text Plane Rotation')
  // lineGenerator.lengthFolder(lineControler, line, 'Line index 0', 0)
  // lineGenerator.lengthFolder(lineControler, line, 'Line index 1', 1)
  // lineGenerator.lengthFolder(lineControler, line, 'Line index 2', 2)
  // objects.add(
  //   car1,
  //    oilMachine, 
  //    car3, 
  //    texturePlane,
  //    textPlane,
  //    textPlane2,
  //    textPlane3
  //    )
  objects.children[0].position.set(-4.5, -1.4, 7.5)
  objects.children[0].rotation.set(-1.571, 0, 4.008)
  device.addToScene(texturePlane)
  device.addToScene(objects.children[0])
  device.addToScene(objects.children[6])
  device.addToScene(objects.children[2])
  // device.addToScene(objects.children[3])
  // transformControls.attach(line)
  // device.addToScene(transformControls)

  // transform(transformControls)
  device.display()

}

main().catch((err) => {
  console.log(err)
})