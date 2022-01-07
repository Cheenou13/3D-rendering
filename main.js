import { DisplayModels } from "./src/Display";

let doc

console.log("before initialize doc is", doc)
const model = 'importedModels/model.gltf'
async function main(){

  const play = new DisplayModels(document)
  const model3D = await play.loadnig(model)
  play.addToScene(model3D)

  play.display ()

  
}

main().catch((err) => {
  console.log(err)
})