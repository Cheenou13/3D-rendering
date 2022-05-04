import * as THREE from 'three'
import gsap from 'gsap'

const clock = new THREE.Clock()
let CLOCK_TICK = 1000, index, randomizedIndex,
    objects = [], workers = [], randomWorkerIndex,
    raycast, mouse, displayWorker, light, colors

export class Loop{
    constructor(camera, scene, renderer, cssRenderer) {
        this.camera = camera
        this.scene = scene
        this.renderer = renderer
        this.cssRenderer = cssRenderer
        this.updatables = []
    }
    start() {
        this.scene.traverse((object) => {
            if (object.children.length > 2 && object.type === 'Group') objects.push(object)
            if (object.type === 'Object3D' && object.name) workers.push(object)
        })
        workers.forEach(worker => { visibility(worker, 0.2, true) })
        /************** initiate variables */
        mouse = new THREE.Vector2()
        raycast = new THREE.Raycaster()
        displayWorker = false
        colors = this.#makeColor()
        const toggleModal = (name) => this.#toggleModal(name)
        var worker = null
        var control = this.updatables[0]
        const myCamera = this.camera
        const myscene = this.scene
        const css = this.cssRenderer
        const stationData = {
            station_name: "void",
            station_status:"void",
            current_piece: "void",
            error_code:"void",
            oee:"void"
        }
        const lightIndicator = [
            {status:'Abnormal', error_code: '3D0F2'}, 
            {status:'Normal', error_code: '4D0F2'}, 
            {status:'Warning', error_code:'5D0F2'}]
        const products = ['motherbord', 'LED Pannel', 'TFT board']
        /********************************* */        
        for (let i = 1; i < objects.length; ++i) {
            objects[i].children[2].material = new THREE.MeshStandardMaterial({ color: new THREE.Color("green") })
        }
        function lightFlickering() {
            randomizedIndex = randomNumGenerator(objects.length)
            if (randomizedIndex === 0) randomizedIndex = 1
            index = randomNumGenerator(colors.length)
            light = objects[randomizedIndex].children[2]
            // move the randomized index to the first index right away because index 0 reserved for scene object
            light.material.color = colors[index]
        }

        function randomNumGenerator(value) {
            /**
             * This generator will generate a radom value from 0 - value
             * @value - is the max number desire but not included
            */
            return Math.floor(Math.random() * value)
        }

        function workerDetected() {
            randomWorkerIndex = randomNumGenerator(workers.length)
            worker = workers[randomWorkerIndex]

            if (!displayWorker) {
                visibility(worker, 0.5, true)
                displayWorker = true
            }
            else {
                visibility(worker, 1, false)
                displayWorker = false
            }
        }

        function visibility(worker, opacity, transparency) {
            
            for (let i = 1; i < worker.children.length; ++ i){
                // save old uv map for new matching to new uv mapping
                var oldTexture = worker.children[i].material.map
                // apply the old uv map to the new mesh, this way the worker would obtain their own
                // old texture and have their own independent map
                worker.children[i].material = new THREE.MeshStandardMaterial({map: oldTexture})
                worker.children[i].material.opacity = opacity
                worker.children[i].material.transparent = transparency
            }
            
        }

        function onMouseMove(event) {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1
            mouse.y = - (event.clientY / window.innerHeight) * 2 + 1
        }

        function onClick() {
            raycast.setFromCamera(mouse, myCamera)
            const intersects = raycast.intersectObjects(myscene.children[2].children)
            stationData.oee = randomNumGenerator(101)+'%'
            var randLightIndicator = randomNumGenerator(lightIndicator.length)
            if (intersects.length > 0) {
                const station = intersects[0].object
                if (station.name === "AOI" || station.parent.name === "AOI") {  
                    stationData.station_name = (station.name === "AOI") ? station.name : station.parent.name
                    stationData.station_status = lightIndicator[randLightIndicator].status
                    stationData.error_code = lightIndicator[randLightIndicator].error_code
                    stationData.current_piece = products[randomNumGenerator(products.length)]
                    console.log("AOI", stationData)
                    moveTo(station, stationData)
                    
                }
                if (intersects[0].object.name === "Manual" || intersects[0].object.parent.name === "Manual") {
                    stationData.station_name = (station.name === "Manual") ? station.name : station.parent.name
                    stationData.station_status = lightIndicator[randLightIndicator].status
                    stationData.error_code = lightIndicator[randLightIndicator].error_code
                    stationData.current_piece = products[randomNumGenerator(products.length)]
                    moveTo(station, stationData)
                    console.log("Manual", stationData)
                }
                if (intersects[0].object.name === "DIMM" || intersects[0].object.parent.name === "DIMM") {
                    stationData.station_name = (station.name === "DIMM") ? station.name : station.parent.name
                    stationData.station_status = lightIndicator[randLightIndicator].status
                    stationData.error_code = lightIndicator[randLightIndicator].error_code
                    stationData.current_piece = products[randomNumGenerator(products.length)]
                    moveTo(station, stationData)
                    console.log("DIMM", stationData)
                }
                if (intersects[0].object.name.includes("Lifter")  || intersects[0].object.parent.name.includes("Lifter") ) {
                    stationData.station_name = "Lifter"
                    stationData.station_status = lightIndicator[randLightIndicator].status
                    stationData.error_code = lightIndicator[randLightIndicator].error_code
                    stationData.current_piece = products[randomNumGenerator(products.length)]
                    moveTo(station, stationData)
                    console.log("Lifter", stationData)
                }
                if (intersects[0].object.name === "Fan" || intersects[0].object.parent.name === "Fan") {
                    stationData.station_name = (station.name === "Fan") ? station.name : station.parent.name
                    stationData.station_status = lightIndicator[randLightIndicator].status
                    stationData.error_code = lightIndicator[randLightIndicator].error_code
                    stationData.current_piece = products[randomNumGenerator(products.length)]
                    moveTo(station, stationData)
                    console.log("Fan", stationData)
                }    
            }
        }
        function moveTo(object, objectInfo) {
            const focalPoint = new THREE.Box3().setFromObject(object)
            const stationCenterPoint = focalPoint.getCenter(new THREE.Vector3())
            const stationSize = focalPoint.getSize(new THREE.Vector3())
            console.log("center: ", stationCenterPoint)
            gsap.to(control.target, {
                duration: 0.5,
                x: stationCenterPoint.x,
                y: stationCenterPoint.y,
                z: stationCenterPoint.z,
                ease: 'power2.in',
                onUpdate: () => {
                    control.update()
                }
            })
            gsap.to(myCamera.position, {
                delay: 0.6,
                duration: 2,
                ease: 'power2.out',
                x: stationCenterPoint.x,
                y: stationCenterPoint.y,
                z: stationCenterPoint.z + stationSize.z * 2, //add the radius around object so it wouldn't zoom in too close on object
                onUpdate: () => {
                    myCamera.lookAt(stationCenterPoint)
                }
            })
            setTimeout(() => { toggleModal(objectInfo) }, 2500)
        }

        function onHover() {
            raycast.setFromCamera(mouse, myCamera)
            const intersects = raycast.intersectObjects(myscene.children[2].children)
            if (intersects.length > 0){
                
                if (intersects[0].object.name === "AOI" || intersects[0].object.parent.name === "AOI") {
                    changeTransparency(intersects[0].object.parent.children[0], true, 0.5)
                    changeTransparency(intersects[0].object.parent.children[1], true, 0.5)
                    changeTransparency(intersects[0].object.parent.children[2], true, 0.5)
                }
                if (intersects[0].object.name === "Manual" || intersects[0].object.parent.name === "Manual") changeTransparency(intersects[0].object, true, 0.5)
                if (intersects[0].object.name === "DIMM" || intersects[0].object.parent.name === "DIMM") {
                    changeTransparency(intersects[0].object.parent.children[0], true, 0.5)
                    changeTransparency(intersects[0].object.parent.children[1], true, 0.5)
                    changeTransparency(intersects[0].object.parent.children[2], true, 0.5)
                }
                if (intersects[0].object.name === "Fan" || intersects[0].object.parent.name === "Fan") {
                    changeTransparency(intersects[0].object.parent.children[0], true, 0.5)
                    changeTransparency(intersects[0].object.parent.children[1], true, 0.5)
                    changeTransparency(intersects[0].object.parent.children[2], true, 0.5)
                }
                if (intersects[0].object.name.includes("Lifter") || intersects[0].object.parent.name.includes("Lifter")) {
                    changeTransparency(intersects[0].object.parent.children[0], true, 0.5)
                    changeTransparency(intersects[0].object.parent.children[1], true, 0.5)
                    changeTransparency(intersects[0].object.parent.children[2], true, 0.5)
                }
            }
        }
        function resettransparency() {
            for (let i = 0; i < myscene.children[2].children.length; ++i) {
                var name = myscene.children[2].children[i].name
                if (name.includes("Lifter")) name = "Lifter"
                switch (name){
                    case "AOI":
                    case "Lifter":
                    case "DIMM":
                    case "Fan":
                        changeTransparency(myscene.children[2].children[i].children[0], false, 1)
                        changeTransparency(myscene.children[2].children[i].children[1], false, 1)
                        changeTransparency(myscene.children[2].children[i].children[2], false, 1)
                        break
                    case "Manual":
                        changeTransparency(myscene.children[2].children[i], false, 1)
                        break
                    default:
    
                }
            }
        }
        function changeTransparency(object, transparent, opacity) {
            object.material.transparent = transparent
            object.material.opacity = opacity
            object.depthWrite = false
            if (transparent) css.domElement.style.cursor = "pointer"
            else css.domElement.style.cursor = ""
        }
        setInterval(lightFlickering, CLOCK_TICK)
        setInterval(workerDetected, CLOCK_TICK)
        this.cssRenderer.domElement.addEventListener('click', onClick, false)
        this.cssRenderer.domElement.addEventListener('mousemove', onMouseMove, false)



        this.renderer.setAnimationLoop(() => {
            // every animation will tick forward one frame
            this.tick()
            // render the frame
            resettransparency()
            onHover()
            this.renderer.render(this.scene, this.camera)
            this.cssRenderer.render(this.scene, this.camera)
        })
    }
    #toggleModal(stationData) {
        var image = document.querySelector(".image")
        var stationName = document.querySelector(".station-name")
        var workPiece = document.querySelector(".workpiece-report")
        var errorCode = document.querySelector(".error-code")
        var oee = document.querySelector(".oee-report")
        var statusType = document.querySelector(".status-type")
        var statusLight = document.querySelector(".light-color")
        var toggleModal = document.querySelector(".modal-bg")
        var doneBtn = document.querySelector(".btn")
        const color = {
            "Abnormal": "#FF6A6A",
            "Warning" : "#e5ba35",
            "Normal"  : "#4ED6B2"
        }
        toggleModal.style.display = "block"
        doneBtn.addEventListener("click", () => {
            toggleModal.style.display = "none"
        })
        console.log("inside toggle ", stationData.station_name)
        if(stationData.station_name === "AOI") {
            console.log("The color is ", color[stationData.station_status])
            image.src = "./assets/stations/AOI.svg"
            workPiece.innerText = stationData.current_piece
            stationName.innerText = stationData.station_name
            errorCode.innerText = stationData.error_code
            oee.innerText = stationData.oee
            statusType.innerText = stationData.station_status
            statusType.style.color = color[stationData.station_status]
            statusLight.style.backgroundColor = color[stationData.station_status]

        }
        if(stationData.station_name === "Fan" || stationData.station_name === "DIMM") {
            console.log("The color is ", color[stationData.station_status])
            image.src = "./assets/stations/dimm-fan.svg"
            workPiece.innerText = stationData.current_piece
            stationName.innerText = stationData.station_name
            errorCode.innerText = stationData.error_code
            oee.innerText = stationData.oee
            statusType.innerText = stationData.station_status
            statusType.style.color = color[stationData.station_status]
            statusLight.style.backgroundColor = color[stationData.station_status]
        }
        if(stationData.station_name === "Manual") {
            console.log("The color is ", color[stationData.station_status])
            image.src = "./assets/stations/manual.svg"
            workPiece.innerText = stationData.current_piece
            stationName.innerText = stationData.station_name
            errorCode.innerText = stationData.error_code
            oee.innerText = stationData.oee
            statusType.innerText = "Manual Info"
            statusType.style.color = "#4ED6B2"
            statusLight.style.backgroundColor = "#4ED6B2"
        }
        if(stationData.station_name === "Lifter") {
            console.log("The color is ", color[stationData.station_status])
            image.src = "./assets/stations/lift.svg"
            workPiece.innerText = stationData.current_piece
            stationName.innerText = stationData.station_name
            errorCode.innerText = stationData.error_code
            oee.innerText = stationData.oee
            statusType.innerText = stationData.station_status
            statusType.style.color = color[stationData.station_status]
            statusLight.style.backgroundColor = color[stationData.station_status]
        }
        // setTimeout(() =>{
        //     toggleModal.style.display = "block"
        // }, 2000)


    }

    stop() {
        this.renderer.setAnimationLoop(null);
        this.updatables = []
    }

    #makeColor() {
        var red = {
            name: 'red',
            r: 1,
            g: 0,
            b: 0
        }
        var green = {
            name: 'green',
            r: 0,
            g: 1,
            b: 0
        }
        var yellow = {
            name: 'yello',
            r: 1,
            g: 1,
            b: 0
        }
        var colors = []
        colors.push(red, green, yellow)
        return colors
    }
    async #getData(url){
        const res = await axios.get(url);
        return res.data;
    }

    tick() {

        for (const obj of this.updatables) { obj.tick(clock.getDelta) }
    }

}