import { PerspectiveCamera } from "three"

export function createCamera(){
    const camera = new PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000)
    camera.position.setZ(5)
    return camera
}