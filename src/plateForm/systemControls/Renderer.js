import { WebGLRenderer } from "three";

export function createRenderer() {
    const renderer = new WebGLRenderer ({antialias: true})
    renderer.physicallyCorrectLights = true
    renderer.setClearColor(0xcad4e3, 1)

    renderer.setSize(innerWidth, innerHeight)
    document.body.appendChild(renderer.domElement)

    return renderer
}