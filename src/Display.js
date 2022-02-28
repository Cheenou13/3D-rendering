import { createScene } from "./PlatForms/components/scene"
import { createLights } from "./PlatForms/components/light"
import { createCamera } from "./PlatForms/components/camera"
import { createControl } from "./PlatForms/systemControls/Control"
import { createRenderer } from "./PlatForms/systemControls/Renderer"
import { loadModel } from "./PlatForms/models/model"
import { Loop } from "./PlatForms/systemControls/Loop"
import { Resizer } from "./PlatForms/systemControls/Resizer"
import axios from "axios"
import { CreatePlanes } from "./PlatForms/models/plane"



const url = 'https://run.mocky.io/v3/8daac68c-09ed-4e7c-83e0-92c941f6a10e'


let camera, renderer, scene, orbit, loop, control, planexGenerator, texturePlane

export class DisplayModels {
    constructor(document){
        camera = createCamera()
        renderer = createRenderer()
        scene = createScene()
        loop = new Loop(camera, scene, renderer)
        orbit = createControl(camera, renderer)
        const {pointLight1, pointLight2, pointLight3, pointLight4} = createLights()
        planexGenerator = new CreatePlanes()
        texturePlane = planexGenerator.loadTexturePlane('/screenBackground/metalMapping.jpeg')
        orbit.addEventListener('change', this.display)
        loop.updatables.push(orbit)
        
        scene.add(pointLight1, pointLight2, pointLight3, pointLight4)
        camera.position.set(0, 4.167, 5.692)
        
        new Resizer(camera, renderer)
        document.body.appendChild(renderer.domElement)
        
    }

    async #loadnig(){
        const {
            rightLifter, leftLifter, stackCartR, stackCartL, FAN_PSU, DIMM, AOICopy, 
            conveyor1, conveyor2, conveyor3, conveyor4, conveyor5, conveyor6,
            manualConveyor1, manualConveyor2, manualConveyor3, manualConveyor4, employee,
            employee1, employee2, employee3

        } = await loadModel()
        scene.add(
            rightLifter, leftLifter, stackCartR, stackCartL, FAN_PSU, DIMM, AOICopy, 
            conveyor1, conveyor2, conveyor3, conveyor4, conveyor5, conveyor6,
            manualConveyor1, manualConveyor2, manualConveyor3, manualConveyor4, employee,
            employee1, employee2, employee3
            )
    }

    async #getData(url){
        const res = await axios.get(url);
        return res.data;
    }

    async #loadLabel(){
        const myData = await this.#getData(url)

        const lift1Label = planexGenerator.getTextPlane(myData['Machine_8'])
        const mt1Label = planexGenerator.getTextPlane(myData['Machine_1'])
        const fanLabel = planexGenerator.getTextPlane(myData['Machine_7'])
        const dimmLabel = planexGenerator.getTextPlane(myData['Machine_3'])
        const mt2Label = planexGenerator.getTextPlane(myData['Machine_2'])
        const mt3Label = planexGenerator.getTextPlane(myData['Machine_5'])
        const aoiLabel = planexGenerator.getTextPlane(myData['Machine_4'])
        const mt4Label = planexGenerator.getTextPlane(myData['Machine_6'])
        const lifter2Label = planexGenerator.getTextPlane(myData['Machine_9'])
      
      
        lift1Label.rotation.set(0, 1.55, 0)
        lift1Label.position.set(-7.126, 0.783, -2.278)
        mt1Label.position.set(-5.34, 0.783, -2.278)
        fanLabel.position.set(-3.554, 0.783, -2.278)
        dimmLabel.position.set(-1.513, 0.783, -2.278)
        mt2Label.position.set(0.23, 0.783, -2.278)
        mt3Label.position.set(1.65, 0.783, -2.278)
        aoiLabel.position.set(3.335, 0.783, -2.278)
        mt4Label.position.set(5, 0.783, -2.278)
        lifter2Label.position.set(7.126, 0.783, -2.278)
        lifter2Label.rotation.set(0, -1.55, 0)
        scene.add(texturePlane)
        scene.add(lift1Label, fanLabel, dimmLabel, mt2Label, mt3Label,
            aoiLabel, mt4Label, lifter2Label, mt1Label)
        
    }
    async int(){
        await this.#loadLabel()
        await this.#loadnig()
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


}