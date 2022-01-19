import { createScene } from "./plateForm/components/scene"
import { createLights } from "./plateForm/components/light"
import { createCamera } from "./plateForm/components/camera"
import { createControl } from "./plateForm/systemControls/Control"
import { createRenderer } from "./plateForm/systemControls/Renderer"
import { loadModel } from "./plateForm/models/model"
import { Loop } from "./plateForm/systemControls/Loop"
import { Resizer } from "./plateForm/systemControls/Resizer"
import { GUI } from 'dat.gui';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { saturn, stars } from "./plateForm/components/CreatePlanets"
import * as THREE from 'three'


let camera, renderer, scene, orbit, loop, control, planet, theStars

export class DisplayModels {
    constructor(document){
        camera = createCamera()
        renderer = createRenderer()
        scene = createScene()
        loop = new Loop(camera, scene, renderer)
        orbit = createControl(camera, renderer)
        const {frontLight, backLight, topLight, bottomLight, ambientLight} = createLights()
        // orbit.autoRotate = true
        orbit.autoRotateSpeed = 0.8
        orbit.addEventListener('change', this.display)
        loop.updatables.push(orbit)
        
        scene.add(frontLight, backLight, topLight)
        camera.position.set(5.7, 1.95, 5)
        
        planet = saturn()
        theStars = stars()
        // const camControl = new GUI().addFolder('camera view')
        // camControl.add(camera.position, 'x', -Math.PI*2, Math.PI*2, 0.001)
        // camControl.add(camera.position, 'y', -Math.PI*2, Math.PI*2, 0.001)
        // camControl.add(camera.position, 'z', -Math.PI*2, Math.PI*2, 0.001)
        scene.add(planet)
        scene.add(theStars)
        
        new Resizer(camera, renderer)
        document.body.appendChild(renderer.domElement)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFShadowMap

        control = new TransformControls (camera, renderer.domElement)
        control.addEventListener('change', this.display)
        control.addEventListener('dragging-changed', (event) => {
            orbit.enabled = !event.value
        })
        
    }

    async loadnig(){
        const objects = await loadModel()
        return objects
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
        control.add(model.position, 'x', -(Math.PI*100), Math.PI*100, 0.001)
        control.add(model.position, 'y', -(Math.PI*100), Math.PI*100, 0.001)
        control.add(model.position, 'z', -(Math.PI*100), Math.PI*100, 0.001)
        
    }

    addToScene(model){
        scene.add(model)
    }

    render(){
        renderer.render(scene, camera)
    }

    display() {
    
        loop.start(planet)
    }
    stop(){
        loop.stop()
    }


}