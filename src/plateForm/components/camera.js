import { PerspectiveCamera } from "three"

export function createCamera(){
    const aspectRatio = innerWidth/innerHeight
    const far = 1000
    const near = 0.1
    const camera = new PerspectiveCamera(75, aspectRatio, near, far)
    camera.position.setZ(5)
    return camera
}