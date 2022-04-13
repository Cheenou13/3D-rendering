import { PerspectiveCamera } from "three"

export function createCamera(){
    const camera = new PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000)
    camera.position.set(-8.15, 1.34, 7.08)

    return camera
}