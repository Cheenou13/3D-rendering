import { PerspectiveCamera } from "three"

export function createCamera(){
    const camera = new PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000)
    camera.position.set(-3.52, 2.72, 7.08)
    return camera
}