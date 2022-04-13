
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { extractModel } from './setUp'
import { LoadingManager, AnimationClip, AnimationMixer} from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import * as THREE from 'three'

let productionLinesFile = '/GLBModels/Machines/productionLines-with-workersV2.glb'

export async function loadModel() {
    const loadingManager = new LoadingManager (() => {
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
    // console.log(producttionLines.children[9].geometry)
    // console.log("producttionLines: \n", producttionLines)
    for (let i = 9; i < producttionLines.children.length; ++i){
        if (producttionLines.children[i].name.includes("Manual")) producttionLines.children[i].name = "Manual"
        if (producttionLines.children[i].name.includes("Lifter") || producttionLines.children[i].name.includes("Start")) producttionLines.children[i].name = "Lifter"
        if (producttionLines.children[i].name.includes("DIMM")) producttionLines.children[i].name = "DIMM"
        if (producttionLines.children[i].name.includes("Fan")) producttionLines.children[i].name = "Fan"
        if (producttionLines.children[i].name.includes("AOI")) producttionLines.children[i].name = "AOI"

    }

    return producttionLines
}

function onTransitionEnd (event) {
    event.target.remove()
}

function generateMixer(animable, clips){
    const mixer = new AnimationMixer(animable)
    const clip = AnimationClip.findByName(clips, 'Armature.001Action.001')
    const action = mixer.clipAction(clip)
    action.play()
    return mixer
}