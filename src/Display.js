import { createScene } from "./plateForm/components/scene"
import { createLights } from "./plateForm/components/light"
import { createCamera } from "./plateForm/components/camera"
import { createControl } from "./plateForm/systemControls/Control"
import { createRenderer } from "./plateForm/systemControls/Renderer"
import { loadModel } from "./plateForm/models/model"
import { Loop } from "./plateForm/systemControls/Loop"


// let camera, renderer, scene, loop

export class DisplayModels {
    constructor(document){
        this.camera = createCamera()
        this.renderer = createRenderer()
        this.scene = createScene()
        this.loop = new Loop(this.camera, this.scene, this.renderer)
        document.body.appendChild(this.renderer.domElement)

        const control = createControl(this.camera, this.renderer.domElement)
        const {frontLight, backLight, ambientLight} = createLights()

        this.scene.add(frontLight, backLight, ambientLight)
        this.loop.updatables.push(control)

    }

    async loadnig(file){
        const model = await loadModel(file)
        // this.scene.add(model)
        return model
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