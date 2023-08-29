import { WebGLRenderer } from "three"
import * as THREE from 'three'
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer"

export function createRenderer() {
    const glRenderer = new WebGLRenderer ({antialias: true, alpha:true})

    const cssRenderer = new CSS3DRenderer({antialias: true, alpha:true});
    glRenderer.outputColorSpace = THREE.SRGBColorSpace;
    cssRenderer.outputColorSpace = THREE.SRGBColorSpace;

    const renders = []
    renders.push(glRenderer, cssRenderer)
    return renders
}