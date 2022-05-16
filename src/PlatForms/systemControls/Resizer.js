
/**
 * will come back later if it is necessary
 */

const setSize = (camera, renderer) => {
    const renderType = renderer.domElement.nodeName
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    if (renderType === "DIV") {
        renderer.setPixelRatio = window.devicePixelRatio
        return
    }
    renderer.setPixelRatio(window.devicePixelRatio)
}

export default class Resizer {
    constructor(camera, renderer) {
        setSize(camera, renderer)

        window.addEventListener('resize', () => {
            setSize(camera, renderer)
            this.onResize()
        }, false)
    }
    onResize(){}
}