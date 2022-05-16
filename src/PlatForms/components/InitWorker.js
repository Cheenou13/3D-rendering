import _WORKER_DATA from '../../../jasonFiles/WorkersData.json'

var colon1, colon2, colon3, colon4
var container, stationStatus, operator, operatorID, task

export default class initWorker {
    #_worker
    #_stationData
    #_isTransparent
    #_element
    #_NUMWORKERS = _WORKER_DATA.name.length
    constructor (worker, element, isTransparent, stationData){
        this.#_isTransparent = isTransparent
        this.#_element = element
        this.#_worker = worker
        this.#_stationData = stationData
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
                container = document.createElement('div')
                stationStatus = document.createElement('span')
                operator = document.createElement('span')
                operatorID = document.createElement('span')
                task = document.createElement('span')
                colon1 = document.createElement('span')
                colon2 = document.createElement('span')
                colon3 = document.createElement('span')
                colon4 = document.createElement('span')
                colon1.innerText = "ACTIVE"
                colon1.style.color = "#4ED6B2"
                colon2.innerText = _WORKER_DATA.name[this.#_randomNumGenerator(this.#_NUMWORKERS)]
                colon3.innerText = _WORKER_DATA.ID[this.#_randomNumGenerator(this.#_NUMWORKERS)]
                colon4.innerText = _WORKER_DATA.task[this.#_randomNumGenerator(2)]
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
        else {

        }
    }
    #_randomNumGenerator(value){
        return Math.floor(Math.random() * value)
    }
}