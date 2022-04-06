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
        var worker = null
        var green = colors[1]
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
            var oldMapp_1 = worker.children[1].material.map
            var oldMapp_2 = worker.children[2].material.map
            var oldMapp_3 = worker.children[3].material.map
            var oldMapp_4 = worker.children[4].material.map
            // apply the old uv map to the new mesh, this way the worker would obtain their own
            // old texture and have their own independent map
            worker.children[1].material = new THREE.MeshStandardMaterial({map: oldMapp_1})
            worker.children[2].material = new THREE.MeshStandardMaterial({map: oldMapp_2})
            worker.children[3].material = new THREE.MeshStandardMaterial({map: oldMapp_3})
            worker.children[4].material = new THREE.MeshStandardMaterial({map: oldMapp_4})
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
        function onClick (event) {
            console.log(event)
        }
        setInterval(lightFlickering, CLOCK_TICK)
        setInterval(workerDetected, CLOCK_TICK)
        window.addEventListener('click', onClick)
        window.addEventListener('mousemove', onMouseMove)
       
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

    tick(){
     
        for (const obj of this.updatables){ obj.tick(clock4.getDelta) }
    }

}