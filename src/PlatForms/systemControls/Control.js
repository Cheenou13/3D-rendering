import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function createControl(camera, renderer){
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.tick = () => controls.update()
    controls.maxPolarAngle = Math.PI/2
    return controls
}