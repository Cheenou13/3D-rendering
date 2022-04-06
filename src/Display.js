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
import { GUI } from 'dat.gui'
import {CSS3DObject, CSS3DSprite}from "three/examples/jsm/renderers/CSS3DRenderer"
import * as THREE from 'three'


const url = 'https://run.mocky.io/v3/8daac68c-09ed-4e7c-83e0-92c941f6a10e'


let camera, scene, orbit, planexGenerator, texturePlane, glRenderer, cssRenderer, rayCaster, pointer

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
        const {pointLight1, pointLight2, pointLight3, pointLight4, ambientLight} = createLights()
        planexGenerator = new CreatePlanes()
        texturePlane = planexGenerator.loadTexturePlane('/usedImages/metalMapping.jpeg')
        // orbit.addEventListener('change', this.display)
        // orbit.autoRotate = true
        this.loop.updatables.push(orbit)
        
        scene.add(ambientLight)
        
        // adjust resize when screen size change so does the objects
        new Resizer(camera, glRenderer)
        new Resizer(camera, cssRenderer)
        const container = document.getElementsByTagName("section")[0].parentNode
        //apend css renderer dom element to the parent dom
        container.appendChild(cssRenderer.domElement)
        // put webgl renderer in front of css renderer
        glRenderer.domElement.style.top = 0
        glRenderer.domElement.style.position = "absolute"
        glRenderer.domElement.style.zIndex = 1

        cssRenderer.domElement.style.top = 0
        cssRenderer.domElement.style.left = 0
        cssRenderer.domElement.style.margin = 0
        cssRenderer.domElement.padding = 0
        //place webgl dom element renderer inside css render dom element
        cssRenderer.domElement.appendChild(glRenderer.domElement)

        
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

        var plane = this.#getPlane(19, 5.7)
        var plane2 = this.#getPlane(13, 5.77)
        var tagPlane = this.#getPlane( 2.24, 0.91)
        plane.position.set(0, 1.50, -8.5)
        tagPlane.position.set(-0.43, 0.68, 0)
        plane2.position.set(9.48, 1.47, -2)
        plane2.rotation.set(0, (1.57*3), 0)
        // var divContainer = document.getElementById("container")
        var element = this.#getDivElement("container")
        var element2 = this.#getDivElement("container2")
        var tagElement = this.#getDivElement("tag-container")
        element.scale.multiplyScalar(1/63)
        element2.scale.multiplyScalar(1/63)
        tagElement.scale.multiplyScalar(1/63)
        // add mesh plane and css object to the same scene
        scene.add(plane, plane2, tagPlane, element, element2, tagElement)
        // set css object position and rotation the same as the plane mesh so when we move the plane the css object moves
        element.position.set(plane.position.x, plane.position.y, plane.position.z)
        element.rotation.set(plane.rotation.x, plane.rotation.y, plane.rotation.z) 
        element2.position.set(plane2.position.x, plane2.position.y, plane2.position.z)
        element2.rotation.set(plane2.rotation.x, plane2.rotation.y, plane2.rotation.z) 
        tagElement.position.set(tagPlane.position.x, tagPlane.position.y, tagPlane.position.z)
        tagElement.rotation.set(tagPlane.rotation.x, tagPlane.rotation.y, tagPlane.rotation.z)
        
        // element2.visible = plane2.visible = false
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
        /**********************************/
        const planeHieght = cfolder.addFolder("Plane Height")
        const planeWidth = cfolder.addFolder("Plane Width")
        const tagElemRotation = cfolder.addFolder("tag element rotation")
        const planePosition = cfolder.addFolder("Plane Position")

        planeHieght.add(dimension.options, "height", -20*wf, 20*hf, 0.01).onChange(changeDimension)
        planeWidth.add(dimension.options, "width", -20*wf, 20*hf, 0.01).onChange(changeDimension)

        producttionLines.position.set(0.22, -1.31, -1.44)
        console.log(tagElement.rotation.x)
        tagElemRotation.add(tagPlane.rotation, "x", -Math.PI*3, Math.PI*3, 0.01)
        tagElemRotation.add(tagPlane.rotation, "y", -Math.PI*3, Math.PI*3, 0.01)
        tagElemRotation.add(tagPlane.rotation, "z", -Math.PI*3, Math.PI*3, 0.01)

        planePosition.add(tagPlane.position, "x", -10, 10, 0.01)
        planePosition.add(tagPlane.position, "y",  -10, 10, 0.01)
        planePosition.add(tagPlane.position, "z",  -10, 10, 0.01)

        const cameraFolder = new GUI()
        const cameraPosition = cameraFolder.addFolder("Camera Position")

        cameraPosition.add(camera.position, 'x', -Math.PI*3, Math.PI*3, 0.01)
        cameraPosition.add(camera.position, 'y', -Math.PI*3, Math.PI*3, 0.01)
        cameraPosition.add(camera.position, 'z', -Math.PI*3, Math.PI*3, 0.01)

        function changeDimension (){
            tagPlane.geometry.dispose()
            tagPlane.geometry = new THREE.PlaneGeometry(
                dimension.options.width, 
                dimension.options.height
            )
        }

        const blocker = document.getElementById("blocker")
        blocker.style.display = "none"
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
        var div = document.getElementById(elementId)
        div.style.display = 'none'
        return new CSS3DObject(div)
    }
    #getPlane(width, height){
        var planeMaterial = new THREE.MeshBasicMaterial({ 
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