import { createScene } from "./PlatForms/components/scene"
import { createLights } from "./PlatForms/components/light"
import { createCamera } from "./PlatForms/components/camera"
import { createControl } from "./PlatForms/systemControls/Control"
import { createRenderer } from "./PlatForms/systemControls/Renderer"
import { loadModel } from "./PlatForms/models/model"
import { Loop } from "./PlatForms/systemControls/Loop"
import { Resizer } from "./PlatForms/systemControls/Resizer"
import { GUI } from 'dat.gui';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { saturn, stars } from "./PlatForms/components/CreatePlanets"
import * as THREE from 'three'


let camera, renderer, scene, orbit, loop, control, saturnPlanet, galaxy

export class DisplayModels {
    constructor(document){
        camera = createCamera()
        renderer = createRenderer()
        scene = createScene()
        loop = new Loop(camera, scene, renderer)
        orbit = createControl(camera, renderer)
        const {frontLight, backLight, topLight, bottomLight, ambientLight} = createLights()
        orbit.autoRotate = true
        loop.updatables.push(orbit)
        
        scene.add(frontLight, backLight, topLight)
        camera.position.set(0, 4.167, 5.692)
        camera.lookAt(0, 0, 0)
        
        // const cameraFolder = new GUI()
        // const cameraPos = cameraFolder.addFolder('Camera Angle')

        // cameraPos.add(camera.position, 'x', -Math.PI*2, Math.PI*2, 0.001)
        // cameraPos.add(camera.position, 'y', -Math.PI*2, Math.PI*2, 0.001)
        // cameraPos.add(camera.position, 'z', -Math.PI*2, Math.PI*2, 0.001)

        
        new Resizer(camera, renderer)
        document.body.appendChild(renderer.domElement)
        saturnPlanet = saturn()
        galaxy = stars()
        saturnPlanet.position.set(3.965, -4.303, -17.85)
        scene.add(saturnPlanet)
        scene.add(galaxy)


        control = new TransformControls (camera, renderer.domElement)
        control.addEventListener('change', this.display)
        control.addEventListener('dragging-changed', (event) => {
            orbit.enabled = !event.value
        })
        
    }

    async loadnig(){
        const {
            lifter1, lifter2, manualStat1, manualStat2, manualStat3,
            manualStat4, FAN_PSU, DIMM, AOI
        } = await loadModel()
        return {
            lifter1, lifter2, manualStat1, manualStat2, manualStat3,
            manualStat4, FAN_PSU, DIMM, AOI
        }
    }

    getTransformControl(){
        return control
    }

    getScene(){
        return scene
    }
    getCamera(){
        return camera
    }
    getRenderer(){
        return renderer
    }
    addModelRotation(model, controls, name){
        
        const control = controls.addFolder(name)
        control.add(model.rotation, 'x', -Math.PI/2, Math.PI*2, 0.001)
        control.add(model.rotation, 'y', -Math.PI/2, Math.PI*2, 0.001)
        control.add(model.rotation, 'z', -Math.PI/2, Math.PI*2, 0.001)
    }

    addModelPosition(model, controls, name){

        const control = controls.addFolder(name)
        control.add(model.position, 'x', -(Math.PI*6 - 1), Math.PI*6 - 1, 0.001)
        control.add(model.position, 'y', -(Math.PI*6 - 1), Math.PI*6 - 1, 0.001)
        control.add(model.position, 'z', -(Math.PI*6 - 1), Math.PI*6 - 1, 0.001)
        
    }

    addToScene(model){
        scene.add(model)
    }

    render(){
        renderer.render(scene, camera)
    }

    display() {
    
        loop.start(saturnPlanet)
    }
    stop(){
        loop.stop()
    }


}