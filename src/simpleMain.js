import { GUI } from "dat.gui";
import { DisplayModels } from "./src/Display";

const model = 'importedModels/model.gltf'
const guiControl = new GUI()
async function main(){

  const device = new DisplayModels(document)
  const planexGenerator = new CreatePlanes()
  const texturePlane = planexGenerator.loadTexturePlane('importedModels/screenBackground/techBackground.jpg')
  
  const model3D = await device.loadnig(model)
  device.addModelRotation(model3D, guiControl)
  device.addModelPosition(model3D, guiControl)
  planexGenerator.controlLocation(texturePlane, guiControl)
  planexGenerator.controlRotation(texturePlane, guiControl)
  planexGenerator.controlSize(texturePlane, guiControl)
  device.addToScene(model3D)
  // device.addToScene(texturePlane)

  device.display ()

  
}

main().catch((err) => {
  console.log(err)
})

// new sections init

const play = new DisplayModels(document)

const testPlane = new CreatePlanes ()
const plane = testPlane.getPlane()
const loadPlane = testPlane.loadTexturePlane('importedModels/screenBackground/NormalMap.png')
console.log('load plane \n', loadPlane)
console.log('normal plane ', plane)
play.addToScene(loadPlane)
testPlane.controlSize(loadPlane, gui)
testPlane.controlLocation(loadPlane, gui)
testPlane.controlRotation(loadPlane, gui)

play.display()