// import { createScene } from "../src/PlatForms/components/scene"
import { createScene } from "../src/PlatForms/components/scene"
import { createLights } from "../src/PlatForms/components/light"
import { createCamera } from "../src/PlatForms/components/camera"
import { createControl } from "../src/PlatForms/systemControls/Control"
import { createRenderer } from "../src/PlatForms/systemControls/Renderer"
import { loadModel } from "../src/PlatForms/models/model"
import { Loop } from "../src/PlatForms/systemControls/Loop"
import { Resizer } from "../src/PlatForms/systemControls/Resizer"
import axios from "axios"
import { CreatePlanes } from "../src/PlatForms/models/plane"
import { GUI } from 'dat.gui'
import {CSS3DObject, CSS3DSprite}from "three/examples/jsm/renderers/CSS3DRenderer"
import * as THREE from 'three'
import { makeBackChart } from "../jsFiles/backChart"
import { makeSideChart } from "../jsFiles/sideChart"



const url = 'https://run.mocky.io/v3/8daac68c-09ed-4e7c-83e0-92c941f6a10e'


let camera, scene, orbit, planexGenerator, texturePlane, glRenderer, cssRenderer, rayCaster, pointer
const motherContainer = document.querySelector(".mother-container")


const dimension = {
    options: {
        width:19,
        height: 7,
        diameter: 0.3,
    }
}
export class DisplayModels {
    constructor(document){
        camera = createCamera()
        this.renders = createRenderer()
        glRenderer = this.renders[0]
        cssRenderer = this.renders[1]
        scene = createScene()
        this.loop = new Loop(camera, scene, glRenderer, cssRenderer)
        orbit = createControl(camera, cssRenderer)
        const {pointLight1, pointLight2, pointLight3, pointLight4, ambientLight, hemiLight, directLight} = createLights()
        planexGenerator = new CreatePlanes()
        texturePlane = planexGenerator.loadTexturePlane('/usedImages/metalMapping.jpeg')
        // orbit.addEventListener('change', this.display)
        // orbit.autoRotate = true
        this.loop.updatables.push(orbit)
        
        scene.add(hemiLight, directLight)
        
        // adjust resize when screen size change so does the objects
        new Resizer(camera, glRenderer)
        new Resizer(camera, cssRenderer)
        // window.addEventListener('resize', () =>{
        //     cssRenderer.setSize(window.innerWidth, window.innerHeight)
        //     cssRenderer.setPixelRatio = window.devicePixelRatio
        // })
        const container = document.body
        //apend css renderer dom element to the parent dom
        container.appendChild(cssRenderer.domElement)
        
        // glRenderer.domElement.appendChild(cssRenderer.domElement)
        // put webgl renderer in front of css renderer
        glRenderer.domElement.style.top = 0
        glRenderer.domElement.style.position = "absolute"
        glRenderer.domElement.style.zIndex = 1
        container.appendChild(cssRenderer.domElement)
        
        // cssRenderer.domElement.style.top = 0
        // cssRenderer.domElement.style.left = 0
        // cssRenderer.domElement.style.margin = 0

        //place webgl dom element renderer inside css render dom element
        cssRenderer.domElement.appendChild(glRenderer.domElement)
        // glRenderer.domElement.appendChild(div)
        // container.appendChild(div)
        // cssRenderer.domElement.appendChild(div)
        // cssRenderer.domElement.classList.add("cssRenderer")

        // const chart = makeChart('chart-div')

  

        
    }

    async #loadnig(){
        const cfolder = new GUI()
        const workerTags = new THREE.Group()
        const producttionLines = await loadModel()
        // console.log(producttionLines)
        scene.add(producttionLines)
        /* 
        making a plane mesh to place css3D object in the same spot so the object would appear as it is in the
        same container as css objects
        */
        
        var backsideWall = this.#getPlane(19, 5.7)
        var rightSideWall = this.#getPlane(13, 5.7)
        var tagPlane1 = this.#getPlane( 2.02, 0.80)
        var tagPlane2 = this.#getPlane( 2.02, 0.80)
        var tagPlane3 = this.#getPlane( 2.02, 0.80)
        var tagPlane4 = this.#getPlane( 2.02, 0.80)
        var tagPlane5 = this.#getPlane( 2.02, 0.80)
        var tagPlane6 = this.#getPlane( 2.02, 0.80)
        var tagPlane7 = this.#getPlane( 2.02, 0.80)
        var tagPlane8 = this.#getPlane( 2.02, 0.80)

        backsideWall.position.set(1.34, 3.8, -6.6)
        rightSideWall.position.set(10.8, 3.8, -0.1)
        rightSideWall.rotation.set(0, (1.57*3), 0)
        tagPlane1.position.set(0.84, 0.68, 1.90)
        tagPlane2.position.set(0.84, 0.68, 4.95)
        tagPlane3.position.set(6.43, 0.68, 1.90)
        tagPlane4.position.set(0.84, 0.68, -1.25)
        tagPlane5.position.set(0.84, 0.68, -4.35)
        tagPlane6.position.set(6.43, 0.68, 4.95)
        tagPlane7.position.set(-3.56, 0.68, -1.25)
        tagPlane8.position.set(-1.61, 0.68, 4.95)
        var element = this.#getDivElement("chart-backwall")
        var element2 = this.#getDivElement("chart-sidewall")
        var tagElement1 = this.#getDivElement("tag-container")
        var tagElement2 = this.#getDivElement()
        var tagElement3 = this.#getDivElement()
        var tagElement4 = this.#getDivElement()
        var tagElement5 = this.#getDivElement()
        var tagElement6 = this.#getDivElement()
        var tagElement6 = this.#getDivElement()
        var tagElement7 = this.#getDivElement()
        var tagElement8 = this.#getDivElement()
        // document.body.appendChild(tagElement2)
        element.scale.multiplyScalar(1/63)
        element2.scale.multiplyScalar(1/63)
        tagElement1.scale.multiplyScalar(1/100)
        tagElement2.scale.multiplyScalar(1/100)
        tagElement3.scale.multiplyScalar(1/100)
        tagElement4.scale.multiplyScalar(1/100)
        tagElement5.scale.multiplyScalar(1/100)
        tagElement6.scale.multiplyScalar(1/100)
        tagElement7.scale.multiplyScalar(1/100)
        tagElement8.scale.multiplyScalar(1/100)
        workerTags.add(
            tagElement1, tagElement2, tagElement3, tagElement4,
            tagElement5, tagElement6, tagElement7, tagElement8
            )
        // add mesh plane and css object to the same scene
        scene.add(
            backsideWall, rightSideWall, tagPlane1, tagPlane2, tagPlane3,
            tagPlane4, tagPlane5, tagPlane6, tagPlane7, tagPlane8,
            element, element2, tagElement1, workerTags
            )
        // set css object position and rotation the same as the plane mesh so when we move the plane the css object moves
        element.position.set(backsideWall.position.x, backsideWall.position.y, backsideWall.position.z)
        element.rotation.set(backsideWall.rotation.x, backsideWall.rotation.y, backsideWall.rotation.z) 
        element2.position.set(rightSideWall.position.x, rightSideWall.position.y, rightSideWall.position.z)
        element2.rotation.set(rightSideWall.rotation.x, rightSideWall.rotation.y, rightSideWall.rotation.z) 
        tagElement1.position.set(tagPlane1.position.x, tagPlane1.position.y-0.06, tagPlane1.position.z)
        tagElement1.rotation.set(tagPlane1.rotation.x, tagPlane1.rotation.y, tagPlane1.rotation.z)
        tagElement2.position.set(tagPlane2.position.x, tagPlane2.position.y-0.06, tagPlane2.position.z)
        tagElement2.rotation.set(tagPlane2.rotation.x, tagPlane2.rotation.y, tagPlane2.rotation.z)
        tagElement3.position.set(tagPlane3.position.x, tagPlane3.position.y-0.06, tagPlane3.position.z)
        tagElement3.rotation.set(tagPlane3.rotation.x, tagPlane3.rotation.y, tagPlane3.rotation.z)
        tagElement4.position.set(tagPlane4.position.x, tagPlane4.position.y-0.06, tagPlane4.position.z)
        tagElement4.rotation.set(tagPlane4.rotation.x, tagPlane4.rotation.y, tagPlane4.rotation.z)
        tagElement5.position.set(tagPlane5.position.x, tagPlane5.position.y-0.06, tagPlane5.position.z)
        tagElement5.rotation.set(tagPlane5.rotation.x, tagPlane5.rotation.y, tagPlane5.rotation.z)
        tagElement6.position.set(tagPlane6.position.x, tagPlane6.position.y-0.06, tagPlane6.position.z)
        tagElement6.rotation.set(tagPlane6.rotation.x, tagPlane6.rotation.y, tagPlane6.rotation.z)
        tagElement7.position.set(tagPlane7.position.x, tagPlane7.position.y-0.06, tagPlane7.position.z)
        tagElement7.rotation.set(tagPlane7.rotation.x, tagPlane7.rotation.y, tagPlane7.rotation.z)
        tagElement8.position.set(tagPlane8.position.x, tagPlane8.position.y-0.06, tagPlane8.position.z)
        tagElement8.rotation.set(tagPlane8.rotation.x, tagPlane8.rotation.y, tagPlane8.rotation.z)
        // element2.visible = rightSideWall.visible = false
        // this.startAnime(mixer, mixer1, mixer2, mixer3)
        this.startAnime()
        /***Normalize screen coordinate***/
        var dw = 1920;
        var dh = 1080;
        var w = dw;
        var h = dh;
        var wf = 1;
        var hf = 1;
        wf = Number(w) / dw
        hf = Number(h) / dh
        /*********************************/
        // producttionLines.position.set(0.22, -1.31, -1.44)
        producttionLines.position.set(1.56, -1.31, 0.46)
        // const planeHieght = cfolder.addFolder("Plane Height")
        // const planeWidth = cfolder.addFolder("Plane Width")
        // const planePosition = cfolder.addFolder("Plane Position")
        // const cssObjectPosition = cfolder.addFolder("css position")
        const productLines = cfolder.addFolder("Production Position")
        const backWall = cfolder.addFolder("Back Wall Position")
        const sideWall = cfolder.addFolder("Side Wall Position")
        const productLinesRotation = cfolder.addFolder("Production Line rotation")
        const backWallSize = cfolder.addFolder("Back Wall Size")
        const cameraAngle = cfolder.addFolder("Camera Angle")

        cameraAngle.add(camera.position, 'x', -10, 10, 0.01)
        cameraAngle.add(camera.position, 'y', -10, 10, 0.01)
        cameraAngle.add(camera.position, 'z', -10, 10, 0.01)
        productLines.add(producttionLines.position, 'x', -10, 10, 0.01)
        productLines.add(producttionLines.position, 'y', -10, 10, 0.01)
        productLines.add(producttionLines.position, 'z', -10, 10, 0.01)
        productLinesRotation.add(producttionLines.rotation, 'x', -Math.PI, Math.PI, 0.01)
        productLinesRotation.add(producttionLines.rotation, 'y', -Math.PI, Math.PI, 0.01)
        productLinesRotation.add(producttionLines.rotation, 'z', -Math.PI, Math.PI, 0.01)
        backWall.add(backsideWall.position, 'x', -10, 10, 0.01)
        backWall.add(backsideWall.position, 'y', -10, 10, 0.01)
        backWall.add(backsideWall.position, 'z', -10, 10, 0.01)
        sideWall.add(rightSideWall.position, 'x', -10, 10, 0.01)
        sideWall.add(rightSideWall.position, 'y', -10, 10, 0.01)
        sideWall.add(rightSideWall.position, 'z', -10, 10, 0.01)
        backWallSize.add(dimension.options, 'height', -20, 20, 0.01).onChange(changeDimension)
        backWallSize.add(dimension.options, 'width', -20, 20, 0.01).onChange(changeDimension)

        // planeHieght.add(dimension.options, "height", -20*wf, 20*hf, 0.01).onChange(changeDimension)
        // planeWidth.add(dimension.options, "width", -20*wf, 20*hf, 0.01).onChange(changeDimension)

        // planePosition.add(tagPlane8.position, "x", -10, 10, 0.01)
        // planePosition.add(tagPlane8.position, "y", -10, 10, 0.01)
        // planePosition.add(tagPlane8.position, "z", -10, 10, 0.01)

        // cssObjectPosition.add(tagElement2.position, 'y', -10, 10, 0.001)
       

        function changeDimension (){
            backsideWall.geometry.dispose()
            backsideWall.geometry = new THREE.PlaneGeometry(
                dimension.options.width, 
                dimension.options.height
            )
        }

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
        lift1Label.position.set(-7.126, 0.8083, -2.278)
        mt1Label.position.set(-5.34, 0.8083, -2.278)
        fanLabel.position.set(-3.554, 0.8083, -2.278)
        dimmLabel.position.set(-1.513, 0.8083, -2.278)
        mt2Label.position.set(0.23, 0.8083, -2.278)
        mt3Label.position.set(1.65, 0.8083, -2.278)
        aoiLabel.position.set(3.335, 0.8083, -2.278)
        mt4Label.position.set(5, 0.8083, -2.278)
        lifter2Label.position.set(7.126, 0.8083, -2.278)
        lifter2Label.rotation.set(0, -1.55, 0)
        makeBackChart()
        makeSideChart()
        // scene.add(texturePlane)
        // scene.add(lift1Label, fanLabel, dimmLabel, mt2Label, mt3Label,
        //     aoiLabel, mt4Label, lifter2Label, mt1Label)
        
    }
    async int(){
        await this.#loadLabel()
        await this.#loadnig()
    }
    startAnime (mixer, mixer1, mixer2, mixer3){
        this.loop.start(mixer, mixer1, mixer2,mixer3)
    }

    #getDivElement(elementId){
        var container = undefined
        
        if (elementId) {
            container = document.getElementById(elementId)
        }
        else {
            container = document.createElement('div')
            var bodyDiv = document.createElement('div')
            var stationStatus = document.createElement('span')
            var employee = document.createElement('span')
            var employeeID = document.createElement('span')
            var task = document.createElement('span')
            stationStatus.innerText = "Station Status: "
            employee.innerText = "Employee: "
            employeeID.innerText = "Employee ID: "
            task.innerText = "Task: "

            bodyDiv.appendChild(stationStatus)
            bodyDiv.appendChild(employee)
            bodyDiv.appendChild(employeeID)
            bodyDiv.appendChild(task)
            container.classList.add("tag-container")
            bodyDiv.classList.add("tag-shadowBox")
            container.appendChild(bodyDiv)

        }
        container.style.display = 'none'
        return new CSS3DObject(container)
    }
    #getPlane(width, height){
        var planeMaterial = new THREE.MeshPhongMaterial({ 
            side: THREE.DoubleSide,
            color: 'black',
            opacity: 0,
            blending: THREE.NoBlending
           
        })
        var planeGeometry = new THREE.PlaneGeometry(width, height)
        planeMaterial.side = THREE.DoubleSide

        return new THREE.Mesh(planeGeometry, planeMaterial)
    }
}