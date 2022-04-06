import { TextureLoader, Scene, Color } from "three";

export function createScene(){
    const scene = new Scene()
    scene.background = new Color("rgb(201, 242, 235)")
    return scene
}