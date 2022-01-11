import { createScene } from "./plateForm/components/scene"
import { createLights } from "./plateForm/components/light"
import { createCamera } from "./plateForm/components/camera"
import { createControl } from "./plateForm/systemControls/Control"
import { createRenderer } from "./plateForm/systemControls/Renderer"
import { loadModel } from "./plateForm/models/model"
import { Loop } from "./plateForm/systemControls/Loop"
import { Resizer } from "./plateForm/systemControls/Resizer"
import { GUI } from 'dat.gui';

let camera, renderer, scene, control, loop

export class DisplayModels {
    constructor(document){
        camera = createCamera()
        renderer = createRenderer()
        scene = createScene()
        loop = new Loop(camera, scene, renderer)
        control = createControl(camera, renderer)
        const {frontLight, backLight, topLight, bottomLight} = createLights()
        control.autoRotate = true
        loop.updatables.push(control)
        scene.add(frontLight, backLight, topLight, bottomLight)
        camera.position.set(6, 2.4297, 6)

        
        new Resizer(camera, renderer)
        document.body.appendChild(renderer.domElement)
        
    }

    async loadnig(file){
        const model = await loadModel(file)
        return model
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