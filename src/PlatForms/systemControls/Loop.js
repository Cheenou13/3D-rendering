import { Clock } from "three";


const clock = new Clock()
const clock1 = new Clock()
const clock2 = new Clock()
const clock3 = new Clock()
const clock4 = new Clock()
export class Loop {
    constructor(camera, scene, renderer) {
        this.camera = camera
        this.scene = scene
        this.renderer = renderer
        this.updatables = []
    }
    start(mixer, mixer1, mixer2, mixer3){
        
        this.renderer.setAnimationLoop( () => {
            // every animation will tick forward one frame
            this.tick()
            // render the frame
            mixer.update(clock.getDelta())
            mixer1.update(clock1.getDelta())
            mixer2.update(clock2.getDelta())
            mixer3.update(clock3.getDelta())
            this.renderer.render(this.scene, this.camera)
        })
    }


    stop(){
        this.renderer.setAnimationLoop(null);
        this.updatables = []
    }

    tick(){
     
        for (const obj of this.updatables){ obj.tick(clock4.getDelta) }
    }

}