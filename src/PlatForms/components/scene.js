import { TextureLoader, Scene, Color } from "three";
import * as THREE from 'three'

export function createScene(){
    const scene = new Scene()
    scene.background = new Color("rgb(201, 242, 235)")
    // scene.background = new Color("black")

    return scene
}