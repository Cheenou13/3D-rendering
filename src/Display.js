
import { createScene } from "../src/PlatForms/components/scene"
import { createLights } from "../src/PlatForms/components/light"
import { createCamera } from "../src/PlatForms/components/camera"
import { createControl } from "../src/PlatForms/systemControls/Control"
import { createRenderer } from "../src/PlatForms/systemControls/Renderer"
import { loadModel } from "../src/PlatForms/models/model"
import { Loop } from "../src/PlatForms/systemControls/Loop"
import { Resizer } from "../src/PlatForms/systemControls/Resizer"
import axios from "axios"
import {CSS3DObject, CSS3DSprite}from "three/examples/jsm/renderers/CSS3DRenderer"
import * as THREE from 'three'
// import { makeBackChart } from "../src/jsFiles/backChart"
// import { makeSideChart } from "../src/jsFiles/sideChart"
import { GuiController } from "../src/jsFiles/guiController"




const url = 'https://run.mocky.io/v3/8daac68c-09ed-4e7c-83e0-92c941f6a10e'
const url2 = "http://10.20.199.77:5015/get_station_status/2"


let camera, scene, orbit, planexGenerator, texturePlane, glRenderer, cssRenderer, testObject, pointer
const _SCALESIZE = 1/100
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
        texturePlane = ""
        this.loop.updatables.push(orbit)
        
        scene.add(hemiLight, directLight)
        
        // adjust resize when screen size change so does the objects
        new Resizer(camera, glRenderer)
        new Resizer(camera, cssRenderer)
        const container = document.body
        //apend css renderer dom element to the parent dom
        container.appendChild(cssRenderer.domElement)
        // put webgl renderer in front of css renderer
        glRenderer.domElement.style.top = 0
        glRenderer.domElement.style.position = "absolute"
        glRenderer.domElement.style.zIndex = 1
        container.appendChild(cssRenderer.domElement)

        //place webgl dom element renderer inside css render dom element
        cssRenderer.domElement.appendChild(glRenderer.domElement)

    }

    async #loadnig(){
        // const cfolder = new GUI()
        const workerTags = new THREE.Group()
        const producttionLines = await loadModel()
        scene.add(producttionLines)
        /* 
        making a plane mesh to place css3D object in the same spot so the object would appear as it is in the
        same container as css objects
        */
        const walls = new THREE.Group()
        walls.name = "walls"
        var backsideWall = this.#getPlane(19, 5.7)
        var rightSideWall = this.#getPlane(13, 5.7)
        backsideWall.name = "backwall"
        rightSideWall.name = "rightwall"
        var tagPlane1 = this.#getPlane( 1.968, 0.95)
        var tagPlane2 = this.#getPlane( 1.968, 0.95)
        var tagPlane3 = this.#getPlane( 1.968, 0.95)
        var tagPlane4 = this.#getPlane( 1.968, 0.95)
        var tagPlane5 = this.#getPlane( 1.968, 0.95)
        var tagPlane6 = this.#getPlane( 1.968, 0.95)
        var tagPlane7 = this.#getPlane( 1.968, 0.95)
        var tagPlane8 = this.#getPlane( 1.968, 0.95)

        walls.add(backsideWall, rightSideWall)
        backsideWall.position.set(1.34, 3.8, -6.6)
        rightSideWall.position.set(10.8, 3.8, -0.1)
        rightSideWall.rotation.set(0, (1.57*3), 0)
        tagPlane1.position.set(2.35, 0.7, 1.90)
        tagPlane2.position.set(2.3, 0.7, 4.95)
        tagPlane3.position.set(6.75, 0.7, 1.90)
        tagPlane4.position.set(2.35, 0.7, -1.25)
        tagPlane5.position.set(2.35, 0.7, -4.35)
        tagPlane6.position.set(-3.15, 0.7, -4.35)
        tagPlane7.position.set(-3.15, 0.7, -1.25)
        tagPlane8.position.set(4.75, 0.7, -4.35)
        producttionLines.position.set(1.56, -1.31, 0.46)
        producttionLines.rotation.set(0, Math.PI, 0)

    
        var element = this.#getDivElement("chart-backwall")
        var element2 = this.#getDivElement("chart-sidewall")
        var tagElement1 = this.#getDivElement()
        var tagElement2 = this.#getDivElement()
        var tagElement3 = this.#getDivElement()
        var tagElement4 = this.#getDivElement()
        var tagElement5 = this.#getDivElement()
        var tagElement6 = this.#getDivElement()
        var tagElement6 = this.#getDivElement()
        var tagElement7 = this.#getDivElement()
        var tagElement8 = this.#getDivElement()
        var globeLabel = this.#getDivElement("instruction")
        var compusLabel = this.#getDivElement("campus-label")
        // document.body.appendChild(tagElement2)
        element.scale.multiplyScalar(1/63)
        element2.scale.multiplyScalar(1/63)
        tagElement1.scale.multiplyScalar(_SCALESIZE )
        tagElement2.scale.multiplyScalar(_SCALESIZE )
        tagElement3.scale.multiplyScalar(_SCALESIZE )
        tagElement4.scale.multiplyScalar(_SCALESIZE )
        tagElement5.scale.multiplyScalar(_SCALESIZE )
        tagElement6.scale.multiplyScalar(_SCALESIZE )
        tagElement7.scale.multiplyScalar(_SCALESIZE )
        tagElement8.scale.multiplyScalar(_SCALESIZE )
        globeLabel.scale.multiplyScalar(_SCALESIZE )
        compusLabel.scale.multiplyScalar(_SCALESIZE )
        workerTags.add(
            tagElement1, tagElement2, tagElement3, tagElement4,
            tagElement5, tagElement6, tagElement7, tagElement8
            )
        // add mesh plane and css object to the same scene
        scene.add(
            walls, tagPlane1, tagPlane2, tagPlane3,
            tagPlane4, tagPlane5, tagPlane6, tagPlane7, tagPlane8,
            element, element2, tagElement1, workerTags, globeLabel, compusLabel
            )
        // set css object position and rotation the same as the plane mesh so when we move the plane the css object moves
        globeLabel.position.set(-5.302, 3.8,-6.6)
        this.#changePosition(compusLabel, rightSideWall, new THREE.Vector3(10.8, 3.8, -3.8))
        this.#changePosition(element, backsideWall)
        this.#changePosition(element2, rightSideWall) 
        this.#changePosition(tagElement1, tagPlane1) 
        this.#changePosition(tagElement2, tagPlane2) 
        this.#changePosition(tagElement3, tagPlane3) 
        this.#changePosition(tagElement4, tagPlane4) 
        this.#changePosition(tagElement5, tagPlane5) 
        this.#changePosition(tagElement6, tagPlane6) 
        this.#changePosition(tagElement7, tagPlane7) 
        this.#changePosition(tagElement8, tagPlane8) 

        const tagGui = new GuiController("Tags Folder")

        // tagGui.addPosition(testObject)
        // tagGui.changeShape(testObject, "plane")

    }
    /**
     * this private method will change the position and rotation of a 3D dom element
     * @param {css3D} target the css 3D object dom element that will be map to 3D object 
     * @param {3DObject} Object3D threejs 3D object, usually plane
     */
    #changePosition (target, Object3D, position){
        if(!position) target.position.set(Object3D.position.x, Object3D.position.y, Object3D.position.z)
        else target.position.set(position.x, position.y, position.z)
        target.rotation.set(Object3D.rotation.x, Object3D.rotation.y, Object3D.rotation.z)
    }
    async #getData(url){
        const res = await axios.get(url);
        return res.data;
    }

    // async #loadLabel(){
    //     const myData = await this.#getData(url)

    //     const lift1Label = planexGenerator.getTextPlane(myData['Machine_8'])
    //     const mt1Label = planexGenerator.getTextPlane(myData['Machine_1'])
    //     const fanLabel = planexGenerator.getTextPlane(myData['Machine_7'])
    //     const dimmLabel = planexGenerator.getTextPlane(myData['Machine_3'])
    //     const mt2Label = planexGenerator.getTextPlane(myData['Machine_2'])
    //     const mt3Label = planexGenerator.getTextPlane(myData['Machine_5'])
    //     const aoiLabel = planexGenerator.getTextPlane(myData['Machine_4'])
    //     const mt4Label = planexGenerator.getTextPlane(myData['Machine_6'])
    //     const lifter2Label = planexGenerator.getTextPlane(myData['Machine_9'])
      
      
    //     lift1Label.rotation.set(0, 1.55, 0)
    //     lift1Label.position.set(-7.126, 0.8083, -2.278)
    //     mt1Label.position.set(-5.34, 0.8083, -2.278)
    //     fanLabel.position.set(-3.554, 0.8083, -2.278)
    //     dimmLabel.position.set(-1.513, 0.8083, -2.278)
    //     mt2Label.position.set(0.23, 0.8083, -2.278)
    //     mt3Label.position.set(1.65, 0.8083, -2.278)
    //     aoiLabel.position.set(3.335, 0.8083, -2.278)
    //     mt4Label.position.set(5, 0.8083, -2.278)
    //     lifter2Label.position.set(7.126, 0.8083, -2.278)
    //     lifter2Label.rotation.set(0, -1.55, 0)

    //     // scene.add(texturePlane)
    //     // scene.add(lift1Label, fanLabel, dimmLabel, mt2Label, mt3Label,
    //     //     aoiLabel, mt4Label, lifter2Label, mt1Label)
        
    // }
    async int(){
        // const testingData = await this.#getData(url2)
        // await this.#loadLabel()
        await this.#loadnig()
        this.#startAnime()
        // console.log("inside Display backend data is ", testingData)
        // makeBackChart()
        // makeSideChart()
    }
    #startAnime (){
        this.loop.start()
    }

    #getDivElement(elementId){
        var container = undefined
        
        if (elementId) {
            container = document.getElementById(elementId)
        }
        else {
            container = document.createElement('div')
            var stationStatus = document.createElement('span')
            var operator = document.createElement('span')
            var operatorID = document.createElement('span')
            var task = document.createElement('span')
            var colon1, colon2, colon3, colon4
            colon1 = document.createElement('span')
            colon2 = document.createElement('span')
            colon3 = document.createElement('span')
            colon4 = document.createElement('span')
            colon1.innerText = " In Progress"
            colon1.style.color = "#4ED6B2"
            colon2.innerText = " Not Applicable"
            colon3.innerText = " Not Applicable"
            colon4.innerText = " Not Applicable"
            stationStatus.innerText = "Station Status"
            operator.innerText = "Operator"
            operatorID.innerText = "Operator ID"
            task.innerText = "Task"
            stationStatus.classList.add("station-status","operator-tag-layout")
            operator.classList.add("operator-name", "operator-tag-layout")
            operatorID.classList.add("operator-id", "operator-tag-layout")
            task.classList.add("task-performed", "operator-tag-layout")
            colon1.classList.add("colon-1", "operator-colon")
            colon2.classList.add("colon-2", "operator-colon")
            colon3.classList.add("colon-3", "operator-colon")
            colon4.classList.add("colon-4", "operator-colon")
            container.appendChild(stationStatus)
            container.appendChild(operator)
            container.appendChild(operatorID)
            container.appendChild(task)
            container.appendChild(colon1)
            container.appendChild(colon2)
            container.appendChild(colon3)
            container.appendChild(colon4)
            container.classList.add("tag-container")
        }
        // container.style.display = 'none'
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