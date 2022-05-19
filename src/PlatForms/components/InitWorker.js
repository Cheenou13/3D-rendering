import _WORKER_DATA from '../../../jasonFiles/WorkersData.json'
import * as THREE from 'three'
import {CSS3DObject}from "three/examples/jsm/renderers/CSS3DRenderer"

var colon1, colon2, colon3, colon4
var container, stationStatus, operator, operatorID, task
var tagElement1, tagElement2, tagElement3, tagElement4, tagElement5, 
tagElement6, tagElement7, tagElement8

var tagPlane1, tagPlane2, tagPlane3, tagPlane4, tagPlane5,
tagPlane6, tagPlane7, tagPlane8
export default class InitWorker {
    #_worker
    #_stationData
    #_isTransparent
    #_element
    #_NUMWORKERS = _WORKER_DATA.station_status[0].name.length
    #_scene
    #_camera
    constructor (worker, element, isTransparent, stationData, camera, scene){
        this.#_isTransparent = isTransparent
        this.#_element = element
        this.#_worker = worker
        this.#_stationData = stationData
        this.#_camera = camera,
        this.#_scene = scene

        console.log("InitWork camera:", this.#_camera)
        console.log("InitWork scene:", this.#_scene)
    }

    #_createHTMLElements(){
        container = document.createElement('div')
        stationStatus = document.createElement('span')
        operator = document.createElement('span')
        operatorID = document.createElement('span')
        task = document.createElement('span')
        colon1 = document.createElement('span')
        colon2 = document.createElement('span')
        colon3 = document.createElement('span')
        colon4 = document.createElement('span')

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

        return new CSS3DObject(container)
    }

    #_updateText(){
        
    }

    #_changeTransparancy (){

        if (!this.#_isTransparent) {
            for (let i = 1; i < this.#_worker.children.length; ++ i){
                // save old uv map for new matching to new uv mapping
                var oldTexture = this.#_worker.children[i].material.map
                // apply the old uv map to the new mesh, this way the worker would obtain their own
                // old texture and have their own independent map
                this.#_worker.children[i].material = new THREE.MeshStandardMaterial({map: oldTexture})
                this.#_worker.children[i].material.opacity = 1
                this.#_worker.children[i].material.transparent = false
                colon1.innerText = _WORKER_DATA.station_status[0].status
                colon1.style.color = "#4ED6B2"
                colon2.innerText = _WORKER_DATA.station_status[0].name[this.#_randomNumGenerator(this.#_NUMWORKERS)]
                colon3.innerText = _WORKER_DATA.station_status[0].ID[this.#_randomNumGenerator(this.#_NUMWORKERS)]
                colon4.innerText = _WORKER_DATA.station_status[0].task
                stationStatus.innerText = "Station Status"
                operator.innerText = "Operator"
                operatorID.innerText = "Operator ID"
                task.innerText = "Task"
            }
        }
        else {
            colon1.innerText = _WORKER_DATA.station_status[1].status
            colon1.style.color = "black"
            colon2.innerText = _WORKER_DATA.station_status[1].name
            colon3.innerText = _WORKER_DATA.station_status[1].ID
            colon4.innerText = _WORKER_DATA.station_status[1].task
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
    }
    #_randomNumGenerator(value){
        return Math.floor(Math.random() * value)
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

    static init (workers, element ,isTransparent ,stationData, camera, scene){
        // console.log("Initwork camera: ")
        new InitWorker(workers, element, isTransparent, stationData, camera, scene)
    }
}