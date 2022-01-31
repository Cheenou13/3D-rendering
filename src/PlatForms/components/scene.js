import { TextureLoader, Scene, Color } from "three";

let background = 'importedModels/screenBackground/techBackground.jpg'

export function createScene(){
    const scene = new Scene()
    const backgroundLoder = new TextureLoader ()
    // backgroundLoder.load(background, (bg) => {
    //     scene.background = bg
    // })
    scene.background = new Color("rgb(201, 242, 235)")
    return scene
}