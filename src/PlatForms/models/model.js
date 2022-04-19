
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { extractModel } from './setUp'
import { LoadingManager, AnimationClip, AnimationMixer } from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import * as THREE from 'three'

let productionLinesFile = '/GLBModels/Machines/productiobLines-withWorkersV2.glb'

export async function loadModel() {
    const loadingManager = new LoadingManager(() => {
        const loadingScreen = document.getElementById('loading-screen')
        loadingScreen.classList.add('fade-out')
        loadingScreen.addEventListener('transitionend', onTransitionEnd)
    })
    const loader = new GLTFLoader(loadingManager)
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/static/')
    loader.setDRACOLoader(dracoLoader)
    const [productionLinesData] = await Promise.all([loader.loadAsync(productionLinesFile)])
    const producttionLines = extractModel(productionLinesData)
    producttionLines.scale.set(0.4, 0.4, 0.4)
    for (let i = 9; i < producttionLines.children.length; ++i) {
        if (producttionLines.children[i].name.includes("Manual")) {
            producttionLines.children[i].name = "Manual"
            resetMaterial(producttionLines.children[i])
        }
        if (producttionLines.children[i].name.includes("Lifter")) {
            producttionLines.children[i].children[0].material.flatShading = true
            producttionLines.children[i].children[1].material.flatShading = true
            // producttionLines.children[i].children[2].material.flatShading = true
        }
        if (producttionLines.children[i].name.includes("DIMM")) {
            producttionLines.children[i].name = "DIMM"
            resetMaterial(producttionLines.children[i].children[0])
            resetMaterial(producttionLines.children[i].children[1])
            // resetMaterial(producttionLines.children[i].children[2])
        }
        if (producttionLines.children[i].name.includes("Fan")) {
            producttionLines.children[i].name = "Fan"
            resetMaterial(producttionLines.children[i].children[0])
            resetMaterial(producttionLines.children[i].children[1])
            // resetMaterial(producttionLines.children[i].children[2])

        }
        if (producttionLines.children[i].name.includes("AOI")) {
            producttionLines.children[i].name = "AOI"
            resetMaterial(producttionLines.children[i].children[0])
            resetMaterial(producttionLines.children[i].children[1])
            // resetMaterial(producttionLines.children[i].children[2])
        }

    }

    return producttionLines
}

function onTransitionEnd(event) {
    event.target.remove()
}

function resetMaterial(object) {
    const oldTexture = object.material.map
    object.material = new THREE.MeshStandardMaterial({
         map: oldTexture, 
         name: "new-mesh-material",
         fog: true,
         flatShading: true
        })
    object.renderOrder = 1
}
function generateMixer(animable, clips) {
    const mixer = new AnimationMixer(animable)
    const clip = AnimationClip.findByName(clips, 'Armature.001Action.001')
    const action = mixer.clipAction(clip)
    action.play()
    return mixer
}