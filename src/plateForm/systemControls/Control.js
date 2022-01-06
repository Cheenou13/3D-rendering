import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export function createControl(camera, canvas){
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.tick = () => controls.update()

    return controls
}