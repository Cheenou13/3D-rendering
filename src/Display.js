import { createScene } from "./plateForm/components/scene"
import { createLights } from "./plateForm/components/light"
import { createCamera } from "./plateForm/components/camera"
import { createControl } from "./plateForm/systemControls/Control"
import { createRenderer } from "./plateForm/systemControls/Renderer"
import { loadModel } from "./plateForm/models/model"
import { Loop } from "./plateForm/systemControls/Loop"
import { Resizer } from "./plateForm/systemControls/Resizer"


const coordinates = {
    options : {
        x : -1.571,
        y : 0,
        z : 0.86
    }
}
export class DisplayModels {
    constructor(document){
        this.camera = createCamera()
        this.renderer = createRenderer()
        this.scene = createScene()
        this.loop = new Loop(this.camera, this.scene, this.renderer)
        document.body.appendChild(this.renderer.domElement)

        const control = createControl(this.camera, this.renderer.domElement)
        const {frontLight, backLight, ambientLight} = createLights()

        this.loop.updatables.push(control)
        this.scene.add(frontLight, backLight, ambientLight)
        
        new Resizer(this.camera, this.renderer)
        
    }

    async loadnig(file){
        const model = await loadModel(file)
        // this.scene.add(model)
        return model
    }

    addModelRotation(model, controls){
        function rotation() {
            model.rotation.set (
                coordinates.options.x,
                coordinates.options.y,
                coordinates.options.z
            )
        }
       
        const control = controls.addFolder('Model Rotation')
        control.add(coordinates.options, 'x', -Math.PI, Math.PI, 0.001).onChange(rotation)
        control.add(coordinates.options, 'y', -Math.PI, Math.PI, 0.001).onChange(rotation)
        control.add(coordinates.options, 'x', -Math.PI, Math.PI, 0.001).onChange(rotation)
    }

    addModelPosition(model, controls){
        function position() {
            model.position.set(
                coordinates.options.x,
                coordinates.options.y,
                coordinates.options.z
            )
        }
        const control = controls.addFolder('Model Position')
        control.add(coordinates.options, 'x', -Math.PI, Math.PI, 0.01).onChange(position)
        control.add(coordinates.options, 'y', -Math.PI, Math.PI, 0.01).onChange(position)
        control.add(coordinates.options, 'z', -Math.PI, Math.PI, 0.01).onChange(position)
    }

    addToScene(model){
        this.scene.add(model)
    }

    render(){
        this.renderer.render(this.scene, this.camera)
    }

    display() {
        this.loop.start()
    }
    stop(){
        this.loop.stop()
    }


}