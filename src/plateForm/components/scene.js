import { TextureLoader, Scene } from "three";

let background = 'importedModels/screenBackground/techBackground.jpg'

export function createScene(){
    const scene = new Scene()
    const backgroundLoder = new TextureLoader ()
    backgroundLoder.load(background, (bg) => {
        scene.background = bg
    })
    return scene
}