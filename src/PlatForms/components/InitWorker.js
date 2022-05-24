import _WORKER_DATA from '../../../jasonFiles/WorkersData.json'
import * as THREE from 'three'
import {CSS3DObject}from "three/examples/jsm/renderers/CSS3DRenderer"
import { GuiController } from '../../jsFiles/GuiController'

var colon1, colon2, colon3, colon4
var container, stationStatus, operator, operatorID, task
const _TAG_NAME = "worker-tag-group"
const _SCALE_SIZE = 1/100
const _ACTIVE_WIDTH = 1.728
const _INACTIVE_WIDTH = 1.675
const _HEIGHT = 0.95
export default class InitWorker {
    #_workers
    #_isTransparent
    #_allElementTags
    #_allPlanes
    #_NUMWORKERS = _WORKER_DATA.station_status[0].name.length
    #_scene
    #_TIMER = 1000
    constructor (workers, scene){
        this.#_isTransparent = false
        this.#_workers = workers
        this.#_scene = scene
        this.#_allElementTags = this.#_getTags(9)
        this.#_allPlanes = this.#_getPlanes(_INACTIVE_WIDTH, _HEIGHT, 9)

        this.#_initAll()
    }

    /**
     * use this method will create a new CSS3DObject
     * @returns a 3D object in a HTLM format
     */

    #_createHTMLElements(){
        container = document.createElement('div')
        stationStatus = document.createElement('span')
        operator = document.createElement('span')
        operatorID = document.createElement('span')
        task = document.createElement('span')

        stationStatus.innerText = "Station Status"
        operator.innerText = "Operator"
        operatorID.innerText = "Operator ID"
        task.innerText = "Task"


        colon1 = document.createElement('span')
        colon2 = document.createElement('span')
        colon3 = document.createElement('span')
        colon4 = document.createElement('span')

        colon1.innerText = _WORKER_DATA.station_status[1].status
        colon1.style.color = "black"
        colon2.innerText = _WORKER_DATA.station_status[1].name
        colon3.innerText = _WORKER_DATA.station_status[1].ID
        colon4.innerText = _WORKER_DATA.station_status[1].task

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

    /**
     * This method will update the text or worker tags if worker is detected at the mechine,
     * this method is prefer when working is registered to work at the mechine otherwise it won't work
     */
    #_updateWorker(){

        var length = this.#_workers.length
        var randIndex = this.#_randomNumGenerator(length)
        var group = this.#_scene.getObjectByName(_TAG_NAME)
        var workers = group.children[randIndex]
        var worker = workers.children[0]
        var tag = workers.children[1]
        var plane = workers.children[2]
        plane.geometry.dispose()
        var myColon_1 = tag.element.querySelector(".colon-1")
        var myColon_2 = tag.element.querySelector(".colon-2")
        var myColon_3 = tag.element.querySelector(".colon-3")
        var myColon_4 = tag.element.querySelector(".colon-4")

        for (let i = 1; i < worker.children.length; ++ i){

            worker.children[i].material.transparent = this.#_isTransparent
            if (!this.#_isTransparent) {
                worker.children[i].material.opacity = 1
                plane.geometry = new THREE.PlaneGeometry(_ACTIVE_WIDTH, _HEIGHT)
                myColon_1.innerText = _WORKER_DATA.station_status[0].status
                myColon_1.style.color = "#4ED6B2"
                myColon_2.innerText = _WORKER_DATA.station_status[0].name[this.#_randomNumGenerator(this.#_NUMWORKERS)]
                myColon_3.innerText = _WORKER_DATA.station_status[0].ID[this.#_randomNumGenerator(this.#_NUMWORKERS)]
                myColon_4.innerText = _WORKER_DATA.station_status[0].task
               
            }
            else {
                worker.children[i].material.opacity = 0.5
                plane.geometry = new THREE.PlaneGeometry(_INACTIVE_WIDTH, _HEIGHT)
                myColon_1.innerText = _WORKER_DATA.station_status[1].status
                myColon_1.style.color = "black"
                myColon_2.innerText = _WORKER_DATA.station_status[1].name
                myColon_3.innerText = _WORKER_DATA.station_status[1].ID
                myColon_4.innerText = _WORKER_DATA.station_status[1].task
            }
        }
    }
    #_detectWorker(){
        // var length = this.#_workers.length
        // var randIndex = this.#_randomNumGenerator(length)
        // var worker = this.#_workers[randIndex]
        if (this.#_isTransparent){
            this.#_updateWorker()
            this.#_isTransparent = false
        }
        else {
            this.#_updateWorker()
            this.#_isTransparent = true
        }
    }

    /**
     *
     * @param {value} value - the upper bound number that will be generated but not included
     * @returns a random number between 0 - value excluding value
     */
    #_randomNumGenerator(value){
        return Math.floor(Math.random() * value)
    }
    /**
     *
     * @param {width} width - the width of thee plan
     * @param {height} height - the height of the plan
     * @param {number} number - the number of plane that will be return
     * @returns a collection of planes with dimension of passing width and height
     */

    #_getPlanes(width, height, number){
        var planeCollections = []
        for (let i = 0; i < number; ++i){
            var planeMaterial = new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide,
                color: 'black',
                opacity: 0,
                blending: THREE.NoBlending

            })
            var planeGeometry = new THREE.PlaneGeometry(width, height)
            planeMaterial.side = THREE.DoubleSide
            var plane = new THREE.Mesh(planeGeometry, planeMaterial)
            plane.name = "plane-"+(i+1)
            planeCollections.push(plane)
        }
        return planeCollections
    }
    /**
     *
     * @param {number} number of tags that will be created
     * @returns a collection of created tags
     */
    #_getTags(number){
        var tagsCollection = []
        for (let i = 0; i < number; ++i){
            var element = this.#_createHTMLElements()
            element.name = "tag-"+(i+1)
            tagsCollection.push(element)
        }

        return tagsCollection
    }
    #_setInterval(){
        setInterval(() =>this.#_detectWorker(), this.#_TIMER)
    }

    #_processingWorkers () {
        // var gui = new GuiController("worker position")
        this.#_workers.forEach(worker => {
            worker.traverse(piece =>{
                piece.frustumCulled = false
            })
        })
        var workerTag_1 = new THREE.Group()
        var workerTag_2 = new THREE.Group()
        var workerTag_3 = new THREE.Group()
        var workerTag_4 = new THREE.Group()
        var workerTag_5 = new THREE.Group()
        var workerTag_6 = new THREE.Group()
        var workerTag_7 = new THREE.Group()
        var workerTag_8 = new THREE.Group()
        var workerTag_9 = new THREE.Group()
        var workersGroup = new THREE.Group()

        var worker_1 = this.#_workers[0].removeFromParent() //worker 1
        var worker_2 = this.#_workers[1].removeFromParent() //worker 2
        var worker_3 = this.#_workers[2].removeFromParent() //worker 3
        var worker_4 = this.#_workers[3].removeFromParent() //worker 4
        var worker_5 = this.#_workers[4].removeFromParent() //worker 5
        var worker_6 = this.#_workers[5].removeFromParent() //worker 6
        var worker_7 = this.#_workers[6].removeFromParent() //worker 7
        var worker_8 = this.#_workers[7].removeFromParent() //worker 8
        var worker_9 = this.#_workers[8].removeFromParent() //worker 9

        var tag_1 = this.#_allElementTags[0]
        var tag_2 = this.#_allElementTags[1]
        var tag_3 = this.#_allElementTags[2]
        var tag_4 = this.#_allElementTags[3]
        var tag_5 = this.#_allElementTags[4]
        var tag_6 = this.#_allElementTags[5]
        var tag_7 = this.#_allElementTags[6]
        var tag_8 = this.#_allElementTags[7]
        var tag_9 = this.#_allElementTags[8]

        var plane_1 = this.#_allPlanes[0]
        var plane_2 = this.#_allPlanes[1]
        var plane_3 = this.#_allPlanes[2]
        var plane_4 = this.#_allPlanes[3]
        var plane_5 = this.#_allPlanes[4]
        var plane_6 = this.#_allPlanes[5]
        var plane_7 = this.#_allPlanes[6]
        var plane_8 = this.#_allPlanes[7]
        var plane_9 = this.#_allPlanes[8]
        
        plane_1.position.set(-3.65, 0.9, -4.332)
        plane_2.position.set(1.8, 0.9, -4.332)
        plane_3.position.set(4.7, 0.9, -4.332)
        plane_4.position.set(-3.1, 0.9, -1)
        plane_5.position.set(2.35, 0.9, -1)
        plane_6.position.set(-5.3, 0.9, -1)
        plane_7.position.set(2.35, 0.9, 2)
        plane_8.position.set(6.75, 0.9, 2)
        plane_9.position.set(2.35, 0.9, 5.15)

        this.#_setTagPoints(tag_1, plane_1.position, plane_1.rotation)
        this.#_setTagPoints(tag_2, plane_2.position, plane_2.rotation)
        this.#_setTagPoints(tag_3, plane_3.position, plane_3.rotation)
        this.#_setTagPoints(tag_4, plane_4.position, plane_4.rotation)
        this.#_setTagPoints(tag_5, plane_5.position, plane_5.rotation)
        this.#_setTagPoints(tag_6, plane_6.position, plane_6.rotation)
        this.#_setTagPoints(tag_7, plane_7.position, plane_7.rotation)
        this.#_setTagPoints(tag_8, plane_8.position, plane_8.rotation)
        this.#_setTagPoints(tag_9, plane_9.position, plane_9.rotation)

        workerTag_1.add(worker_1, tag_1, plane_1)
        workerTag_2.add(worker_2, tag_2, plane_2)
        workerTag_3.add(worker_3, tag_3, plane_3)
        workerTag_4.add(worker_4, tag_4, plane_4)
        workerTag_5.add(worker_5, tag_5, plane_5)
        workerTag_6.add(worker_6, tag_6, plane_6)
        workerTag_7.add(worker_7, tag_7, plane_7)
        workerTag_8.add(worker_8, tag_8, plane_8)
        workerTag_9.add(worker_9, tag_9, plane_9)

        // gui.addPosition(plane_9)

        workerTag_1.name = "workertag-1"
        workerTag_2.name = "workertag-2"
        workerTag_3.name = "workertag-3"
        workerTag_4.name = "workertag-4"
        workerTag_5.name = "workertag-5"
        workerTag_6.name = "workertag-6"
        workerTag_7.name = "workertag-7"
        workerTag_8.name = "workertag-8"
        workerTag_9.name = "workertag-9"
        workersGroup.name = _TAG_NAME

        worker_1.scale.set (0.75, 0.75, 0.75)
        worker_2.scale.set (0.75, 0.75, 0.75)
        worker_3.scale.set (0.75, 0.75, 0.75)
        worker_4.scale.set (0.75, 0.75, 0.75)
        worker_5.scale.set (0.75, 0.75, 0.75)
        worker_6.scale.set (0.75, 0.75, 0.75)
        worker_7.scale.set (0.75, 0.75, 0.75)
        worker_8.scale.set (0.75, 0.75, 0.75)
        worker_9.scale.set (0.75, 0.75, 0.75)

        worker_1.rotation.set(-Math.PI, -Math.PI, -Math.PI)
        worker_2.rotation.set(-Math.PI, -Math.PI, -Math.PI)
        worker_3.rotation.set(-Math.PI, -Math.PI, -Math.PI)
        worker_4.rotation.set(-Math.PI, -Math.PI, -Math.PI)
        worker_5.rotation.set(-Math.PI, -Math.PI, -Math.PI)
        worker_6.rotation.set(-Math.PI, 0, -Math.PI)
        worker_7.rotation.set(-Math.PI, -Math.PI, -Math.PI)
        worker_8.rotation.set(-Math.PI, -Math.PI, -Math.PI)
        worker_9.rotation.set(-Math.PI, -Math.PI, -Math.PI)
        /*********************************************4th Line */
        // var planeGUI = new GuiController("plane size")

        worker_1.position.set(-3.142, -1.3, -4.6)
        worker_2.position.set(4.75, -1.3, -5.0)
        worker_3.position.set(1.8, -1.3, -4.817)
        /*********************************************3rd Line */
        worker_4.position.set(-3.142, -1.3, -1.55)
        worker_5.position.set(2.845, -1.3, -1.55)
        worker_6.position.set(-4.917, -1.3, -0.37)
        /*********************************************2rd Line */
        worker_7.position.set(2.845, -1.3, 1.6)
        worker_8.position.set(6.725, -1.3, 1.6)
        /*********************************************1st Line */
        worker_9.position.set(2.845, -1.3, 4.73)


        workersGroup.add(workerTag_1, workerTag_2, workerTag_3, workerTag_4,
            workerTag_5, workerTag_6,  workerTag_7, workerTag_8, workerTag_9)
        this.#_scene.add(workersGroup)


        // gui.addPosition(worker_4)

    }
    #_setTagPoints(target, position, rotation){

        target.position.set(position.x, position.y, position.z)
        target.rotation.set(rotation.x, rotation.y, rotation.z)
        target.scale.multiplyScalar(_SCALE_SIZE)
    
    }
    /**
     * Initialized all of the workers and their tags
     * number of tags are created according to the number of workers represent in the scene
     */
    #_initAll (){
        this.#_processingWorkers()
        this.#_setInterval()
    }

    /**
     * a static method use to initial this object
     * @param {workers} workers - the collections of worker in the scene
     * @param {element} element - a html element that will be use to render in the scene
     * @param {isTransparent} isTransparent - a boolean value to indicate if worker is detected or not
     * @param {stationData} stationData - the data of the station the worker is at
     * @param {camera} camera - the camera in the this render
     * @param {scene} scene - the scene inthe this render
     */
    static init (workers, scene){
        new InitWorker(workers, scene)
    }
}