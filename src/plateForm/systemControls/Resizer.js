
/**
 * will come back later if it is necessary
 */

const setSize = (camera, renderer) => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
}

export class Resizer {
    constructor(camera, renderer) {
        setSize(camera, renderer)

        window.addEventListener('resize', () => {
            setSize(camera, renderer)
            this.onResize()
        }, false)
    }
    onResize(){}
}