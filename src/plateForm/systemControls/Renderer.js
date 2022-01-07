import { WebGLRenderer } from "three"

export function createRenderer() {
    const renderer = new WebGLRenderer ({antialias: true})
    renderer.physicallyCorrectLights = true
    renderer.setClearColor(0xcad4e3, 1)
    renderer.setPixelRatio(devicePixelRatio)
    renderer.setSize(innerWidth, innerHeight)

    return renderer
}