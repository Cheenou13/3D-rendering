
import { createScene } from "./PlatForms/components/scene"
import { createLights } from "./PlatForms/components/light"
import { createCamera } from "./PlatForms/components/camera"
import  createControl  from "./PlatForms/systemControls/Control"
import { createRenderer } from "./PlatForms/systemControls/Renderer"
import { loadModel } from "./PlatForms/models/model"
import { Loop } from "./PlatForms/systemControls/Loop"
import  Resizer  from "./PlatForms/systemControls/Resizer"
import axios from "axios"
import {CSS3DObject, CSS3DSprite}from "three/examples/jsm/renderers/CSS3DRenderer"
import * as THREE from 'three'
import { GuiController } from "../src/jsFiles/guiController"
import _WORKER_DATA from "../jasonFiles/WorkersData.json"
console.log(_WORKER_DATA)



const url = 'https://run.mocky.io/v3/8daac68c-09ed-4e7c-83e0-92c941f6a10e'
const url2 = "http://10.20.199.77:5015/get_station_status/2"


let camera, scene, orbit, texturePlane, glRenderer, cssRenderer, testObject
const _SCALESIZE = 1/100
export class DisplayModels {
    #_NUMWORKERS
    #_STATUS 
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
        this.#_NUMWORKERS = _WORKER_DATA.name.length
        this.#_STATUS = _WORKER_DATA.station_status.length
        
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
        // var tagPlane1 = this.#getPlane( 1.968, 0.95)
        var tagPlane1 = this.#getPlane( 1.728, 0.95)
        var tagPlane2 = this.#getPlane( 1.728, 0.95)
        var tagPlane3 = this.#getPlane( 1.728, 0.95)
        var tagPlane4 = this.#getPlane( 1.728, 0.95)
        var tagPlane5 = this.#getPlane( 1.728, 0.95)
        var tagPlane6 = this.#getPlane( 1.728, 0.95)
        var tagPlane7 = this.#getPlane( 1.728, 0.95)
        var tagPlane8 = this.#getPlane( 1.728, 0.95)

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

        tagGui.addPosition(tagPlane1)
        tagGui.changeShape(tagPlane1, "plane")

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

    async int(){
        await this.#loadnig()
        this.#startAnime()
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
            colon1.innerText = "ACTIVE"
            colon1.style.color = "#4ED6B2"
            colon2.innerText = _WORKER_DATA.name[this.#_randomNumGenerator(this.#_NUMWORKERS)]
            colon3.innerText = _WORKER_DATA.ID[this.#_randomNumGenerator(this.#_NUMWORKERS)]
            colon4.innerText = "Inspecting"
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
    #_randomNumGenerator(value){
        return Math.floor(Math.random() * value)
    }
}