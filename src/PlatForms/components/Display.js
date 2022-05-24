
import { createScene } from "./scene"
import { createLights } from "./light"
import { createCamera } from "./camera"
import  createControl  from "../systemControls/Control"
import { createRenderer } from "../systemControls/Renderer"
import { loadModel } from "../models/model"
import { Loop } from "../systemControls/Loop"
import  Resizer  from "../systemControls/Resizer"
import axios from "axios"
import {CSS3DObject}from "three/examples/jsm/renderers/CSS3DRenderer"
import * as THREE from 'three'



let camera, scene, orbit, texturePlane, glRenderer, cssRenderer
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

        walls.add(backsideWall, rightSideWall)
        backsideWall.position.set(1.34, 3.8, -6.6)
        rightSideWall.position.set(10.8, 3.8, -0.1)
        rightSideWall.rotation.set(0, (1.57*3), 0)
        producttionLines.position.set(1.56, -1.31, 0.46)
        producttionLines.rotation.set(0, Math.PI, 0)

    
        var element = this.#getDivElement("chart-backwall")
        var element2 = this.#getDivElement("chart-sidewall")
        var globeLabel = this.#getDivElement("instruction")
        var compusLabel = this.#getDivElement("campus-label")
        element.scale.multiplyScalar(1/63)
        element2.scale.multiplyScalar(1/63)
        globeLabel.scale.multiplyScalar(_SCALESIZE )
        compusLabel.scale.multiplyScalar(_SCALESIZE )
        // add mesh plane and css object to the same scene
        scene.add(walls, element, element2, globeLabel, compusLabel)
        // set css object position and rotation the same as the plane mesh so when we move the plane the css object moves
        globeLabel.position.set(-5.302, 3.8,-6.6)
        this.#changePosition(compusLabel, rightSideWall, new THREE.Vector3(10.8, 3.8, -3.8))
        this.#changePosition(element, backsideWall)
        this.#changePosition(element2, rightSideWall)  

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
    
    async int(){
        await this.#loadnig()
        this.loop.start()
    }

    #getDivElement(elementId){
        var container = undefined
        container = document.getElementById(elementId)
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