import { Clock } from "three";


const clock = new Clock()

export class Loop {
    constructor(camera, scene, renderer) {
        this.camera = camera
        this.scene = scene
        this.renderer = renderer
        this.updatables = []
    }
    start(object){
        this.renderer.setAnimationLoop( () => {
            //every animation will tick forward one frame
            this.tick();
            // render the frame
            this.renderer.render(this.scene, this.camera)
        })
    }

    stop(){
        this.renderer.setAnimationLoop(null);
        this.updatables = []
    }

    tick(){
        const delta = clock.getDelta()
        for (const obj of this.updatables){ obj.tick(delta) }
    }

}