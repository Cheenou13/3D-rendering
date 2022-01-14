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


let camera, renderer, scene, orbit, loop, control

export class DisplayModels {
    constructor(document){
        camera = createCamera()
        renderer = createRenderer()
        scene = createScene()
        loop = new Loop(camera, scene, renderer)
        orbit = createControl(camera, renderer)
        const {frontLight, backLight, topLight, bottomLight} = createLights()
        orbit.autoRotate = true
        orbit.addEventListener('change', this.display)
        loop.updatables.push(orbit)
        scene.add(frontLight, backLight, topLight, bottomLight)
        camera.position.set(5.7, 1.95, 5)

        // const camControl = new GUI().addFolder('camera view')
        // camControl.add(camera.position, 'x', -Math.PI*2, Math.PI*2, 0.001)
        // camControl.add(camera.position, 'y', -Math.PI*2, Math.PI*2, 0.001)
        // camControl.add(camera.position, 'z', -Math.PI*2, Math.PI*2, 0.001)

        
        new Resizer(camera, renderer)
        document.body.appendChild(renderer.domElement)

        control = new TransformControls (camera, renderer.domElement)
        control.addEventListener('change', this.display)
        control.addEventListener('dragging-changed', (event) => {
            orbit.enabled = !event.value
        })
        
    }

    async loadnig(file){
        const model = await loadModel(file)
        return model
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
        control.add(model.rotation, 'x', -Math.PI/2, Math.PI, 0.001)
        control.add(model.rotation, 'y', -Math.PI/2, Math.PI, 0.001)
        control.add(model.rotation, 'z', -Math.PI/2, Math.PI, 0.001)
    }

    addModelPosition(model, controls, name){
       
        const control = controls.addFolder(name)
        control.add(model.position, 'x', -Math.PI, Math.PI, 0.01)
        control.add(model.position, 'y', -Math.PI, Math.PI, 0.01)
        control.add(model.position, 'z', -Math.PI, Math.PI, 0.01)
    }

    addToScene(model){
        scene.add(model)
    }

    render(){
        renderer.render(scene, camera)
    }

    display() {
        loop.start()
    }
    stop(){
        loop.stop()
    }


}