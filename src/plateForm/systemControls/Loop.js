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
            object.children[0].rotation.y += 0.01
            object.children[1]. rotation.z += 0.001
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