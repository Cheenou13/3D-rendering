import { GUI } from "dat.gui";
import { DisplayModels } from "./src/Display";

const model = 'importedModels/model.gltf'
const guiControl = new GUI()
async function main(){

  const play = new DisplayModels(document)
  const model3D = await play.loadnig(model)
  play.addModelPosition(model3D, guiControl)
  play.addModelRotation(model3D, guiControl)
  play.addToScene(model3D)

  play.display ()

  
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