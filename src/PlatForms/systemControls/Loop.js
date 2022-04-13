import * as THREE from 'three'


const clock = new THREE.Clock()
const clock1 = new THREE.Clock()
const clock2 = new THREE.Clock()
const clock3 = new THREE.Clock()
const clock4 = new THREE.Clock()
let CLOCK_TICK = 1000, index, randomizedIndex, 
objects = [], workers = [], randomWorkerIndex,
raycast, mouse, displayWorker, light, colors
export class Loop {
    constructor(camera, scene, renderer, cssRenderer) {
        this.camera = camera
        this.scene = scene
        this.renderer = renderer
        this.cssRenderer = cssRenderer
        this.updatables = []
    }
    start(mixer, mixer1, mixer2, mixer3){
        this.scene.traverse ((object) => { 
            if (object.children.length > 2 && object.type === 'Group') objects.push(object)
            if (object.type === 'Object3D' && object.name) {
                workers.push(object)
            }
        })
        workers.forEach(worker => {visibility(worker, 0.2, true)})
        /************** initiate variables */
        mouse = new THREE.Vector2()
        raycast = new THREE.Raycaster()
        displayWorker = false
        colors = this.#makeColor()
        const toggleModal = () => this.#toggleModal()
        var worker = null
        const myCamera = this.camera
        const myscene = this.scene
        /********************************* */
        // objects.filter((object => object.type !== "Mesh"))
        // randomizedIndex = Math.floor((Math.random()  * objects.length)-1)
        // console.log(randomizedIndex)           
        for (let i = 1; i < objects.length; ++i){
            objects[i].children[2].material = new THREE.MeshStandardMaterial({color: new THREE.Color("green")})
        }
        function lightFlickering(){
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

        function workerDetected (){
            randomWorkerIndex = randomNumGenerator(workers.length)
            worker = workers[randomWorkerIndex]
         
            if (!displayWorker){
                visibility (worker, 0.2, true)
                displayWorker = true
            }
            else {
                visibility (worker, 1, false)
                displayWorker = false
            }

        }

        function visibility(worker, opacity, transparency){
            // save old uv map for new matching to new uv mapping
            var oldTexture_1 = worker.children[1].material.map
            var oldTexture_2 = worker.children[2].material.map
            var oldTexture_3 = worker.children[3].material.map
            var oldTexture_4 = worker.children[4].material.map
            // apply the old uv map to the new mesh, this way the worker would obtain their own
            // old texture and have their own independent map
            worker.children[1].material = new THREE.MeshStandardMaterial({map: oldTexture_1})
            worker.children[2].material = new THREE.MeshStandardMaterial({map: oldTexture_2})
            worker.children[3].material = new THREE.MeshStandardMaterial({map: oldTexture_3})
            worker.children[4].material = new THREE.MeshStandardMaterial({map: oldTexture_4})
            // change the transparency and opacity of worker
            worker.children[1].material.opacity = opacity
            worker.children[1].material.transparent = transparency
            worker.children[2].material.opacity = opacity
            worker.children[2].material.transparent = transparency
            worker.children[3].material.opacity = opacity
            worker.children[3].material.transparent = transparency
            worker.children[4].material.opacity = opacity
            worker.children[4].material.transparent = transparency
        }

        function onMouseMove(event) {
            mouse.x = (event.clientX/window.innerWidth) * 2 - 1
            mouse.y = - (event.clientY/window.innerHeight) * 2 + 1
        }
        function onClick () {
            raycast.setFromCamera(mouse, myCamera)
            const length = myscene.children[2].children.length
            const intersects = raycast.intersectObjects(myscene.children[2].children)
            for (let i = 0; i < intersects.length; ++ i) {
                if (intersects[i].object.name === "AOI" || intersects[i].object.parent.name === "AOI") toggleModal()
                if (intersects[i].object.name === "Manual" || intersects[i].object.parent.name === "Manual") toggleModal()
                if (intersects[i].object.name === "DIMM" || intersects[i].object.parent.name === "DIMM") toggleModal()
                if (intersects[i].object.name === "Lifter" || intersects[i].object.parent.name === "Lifter") toggleModal()
                if (intersects[i].object.name === "Fan" || intersects[i].object.parent.name === "Fan") toggleModal()      
            }
            // console.log(length)
        }
        function onHover (){
            raycast.setFromCamera(mouse, myCamera)
            const intersects = raycast.intersectObjects(myscene.children[2].children)
            for (let i = 0; i < intersects.length; ++ i) {
                if (intersects[i].object.name === "AOI" || intersects[i].object.parent.name === "AOI") {
                    intersects[i].object.material.transparent = true
                    intersects[i].object.material.opacity = 0.5
                }
                if (intersects[i].object.name === "Manual" || intersects[i].object.parent.name === "Manual"){
                    intersects[i].object.material.transparent = true
                    intersects[i].object.material.opacity = 0.5
                }
                if (intersects[i].object.name === "DIMM" || intersects[i].object.parent.name === "DIMM"){
                    intersects[i].object.material.transparent = true
                    intersects[i].object.material.opacity = 0.5
                }
                if (intersects[i].object.name === "Lifter" || intersects[i].object.parent.name === "Lifter") {
                    intersects[i].object.material.transparent = true
                    intersects[i].object.material.opacity = 0.5
                }
                if (intersects[i].object.name === "Fan" || intersects[i].object.parent.name === "Fan") {
                    intersects[i].object.material.transparent = true
                    intersects[i].object.material.opacity = 0.5
                }
            }
        }
        function resettransparency(){
            for (let i = 0; i < myscene.children[2].children.length; ++ i){
                // myscene.children[2].children[i].material.transparent = false
                myscene.children[2].children[i].material.opacity = 1
            }
        }
        setInterval(lightFlickering, CLOCK_TICK)
        setInterval(workerDetected, CLOCK_TICK)
        // this.cssRenderer.domElement.addEventListener('mouseover', (event) => {
        //     console.log(event.target)
        // })
        this.cssRenderer.domElement.addEventListener('click', onClick, false)
        this.cssRenderer.domElement.addEventListener('mousemove', onMouseMove, false)
        // this.cssRenderer.domElement.addEventListener('mouseover', onHover)
       
        this.renderer.setAnimationLoop( () => {
            // every animation will tick forward one frame
            this.tick()
            // render the frame
            // mixer.update(clock.getDelta())
            // mixer1.update(clock1.getDelta())
            // mixer2.update(clock2.getDelta())
            // mixer3.update(clock3.getDelta())
            this.renderer.render(this.scene, this.camera)
            this.cssRenderer.render(this.scene, this.camera)
        })
    }
    #toggleModal(){
        let toggleModal = document.querySelector(".modal-bg")
        let doneBtn = document.querySelector(".btn")
        if (toggleModal.style.display !== "block")toggleModal.style.display = "block"
        else doneBtn.addEventListener("click", () => {
            toggleModal.style.display = "none"
        })
    }

    stop(){
        this.renderer.setAnimationLoop(null);
        this.updatables = []
    }

    #makeColor (){
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
            b:0
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
    #isMachine(mouse, camera, scene){
        raycast.setFromCamera(mouse, camera)
        const intersects = raycast.intersectObjects(scene.children[2].children)
        for (let i = 0; i < intersects.length; ++ i) {
            if (intersects[i].object.name === "AOI" || intersects[i].object.parent.name === "AOI") return true
            if (intersects[i].object.name === "Manual" || intersects[i].object.parent.name === "Manual") return true
            if (intersects[i].object.name === "DIMM" || intersects[i].object.parent.name === "DIMM") return true
            if (intersects[i].object.name === "Lifter" || intersects[i].object.parent.name === "Lifter") return true
            if (intersects[i].object.name === "Fan" || intersects[i].object.parent.name === "Fan") return true     
        }
        return false
    }

    tick(){
     
        for (const obj of this.updatables){ obj.tick(clock4.getDelta) }
    }

}