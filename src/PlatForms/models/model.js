
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { extractModel } from './setUp'
import { LoadingManager } from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GUI } from 'dat.gui'

// let oilTank = '/GLBModels/oilTank.glb'
let wishMach = '/GLBModels/noColored.glb'
let productMach = '/GLBModels/colored.glb'
let lifter = '/GLBModels/lieftCompressed.glb'

export async function loadModel() {
    const folder = new GUI ()
    const loadingManager = new LoadingManager (() => {
        const loadingScreen = document.getElementById('loading-screen')
        loadingScreen.classList.add('fade-out')
        loadingScreen.addEventListener('transitionend', onTransitionEnd)
    })
    const loader = new GLTFLoader(loadingManager)
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/static/')
    loader.setDRACOLoader(dracoLoader)
    const [lifterData, wishMachD1, productMachD1] = 
    await Promise.all([
        loader.loadAsync(lifter), 
        loader.loadAsync(wishMach),
        loader.loadAsync(productMach)
    ])  
    const lifter1 = extractModel(lifterData)
    const lifter2 = lifter1.clone()
 
    lifter1.scale.set(0.0013, 0.0009, 0.0013)
    lifter2.scale.set(0.0013, 0.0009, 0.0013)
    
    const manualStat1 = extractModel(wishMachD1)
    const manualStat2 = manualStat1.clone()
    const manualStat3 = manualStat1.clone()
    const manualStat4 = manualStat1.clone()

    manualStat1.scale.set(0.13, 0.10, 0.13)
    manualStat2.scale.set(0.13, 0.10, 0.13)
    manualStat3.scale.set(0.13, 0.10, 0.13)
    manualStat4.scale.set(0.13, 0.10, 0.13)

    const FAN_PSU = extractModel(productMachD1)
    const DIMM = FAN_PSU.clone()
    const AOI = FAN_PSU.clone()

    FAN_PSU.scale.set(0.38, 0.38, 0.38)
    DIMM.scale.set(0.38, 0.38, 0.38)
    AOI.scale.set(0.38, 0.38, 0.38)

    lifter1.rotation.set(0, 0, Math.PI)
    lifter1.position.set(-6., -0.713, -1.648)
    manualStat1.position.set(-5.085, -2.023, -2.278)
    manualStat1.rotation.set(-1.571, 0, 4.701)
    FAN_PSU.position.set(-3.554, -1.4, -2.278)
    FAN_PSU.rotation.set(-1.571, 0, -1.571)
    DIMM.position.set(-1.513, -1.4, -2.278)
    DIMM.rotation.set(-1.571, 0, -1.571)
    manualStat2.position.set(0.273, -2.023, -2.278)
    manualStat2.rotation.set(-1.571, 0, 4.701)
    manualStat3.position.set(1.77, -2.023, -2.26)
    manualStat3.rotation.set(-1.571, 0, 4.701)
    AOI.position.set(3.30, -1.4, -2.278)
    AOI.rotation.set(-1.571, 0, -1.571)
    manualStat4.position.set(5.12, -2.023, -2.26)
    manualStat4.rotation.set(-1.571, 0, 4.701)
    lifter2.rotation.set(-Math.PI, Math.PI, 0)
    lifter2.position.set(7.499, -0.713, -1.648)

    // const guiPosition1 = folder.addFolder("Lifter1 Position")
    // const guiRotation1 = folder.addFolder("Lifter1 Rotation")

    // const guiPosition2 = folder.addFolder("Lifter2 Position")
    // const guiRotation2 = folder.addFolder("Lifter2 Rotation")

    // guiPosition1.add(lifter1.position, 'x',-3*Math.PI, 3*Math.PI, 0.001)
    // guiPosition1.add(lifter1.position, 'y', -3*Math.PI, 3*Math.PI, 0.001)
    // guiPosition1.add(lifter1.position, 'z', -3*Math.PI, 3*Math.PI, 0.001)

    // guiRotation1.add(lifter1.rotation, 'x', -Math.PI, Math.PI, 0.001)
    // guiRotation1.add(lifter1.rotation, 'y', -Math.PI, Math.PI, 0.001)
    // guiRotation1.add(lifter1.rotation, 'z', -Math.PI, Math.PI, 0.001)

    // guiPosition2.add(lifter2.position, 'x', -3*Math.PI, 3*Math.PI, 0.001)
    // guiPosition2.add(lifter2.position, 'y', -3*Math.PI, 3*Math.PI, 0.001)
    // guiPosition2.add(lifter2.position, 'z', -3*Math.PI, 3*Math.PI, 0.001)

    // guiRotation2.add(lifter2.rotation, 'x', -Math.PI, Math.PI, 0.001)
    // guiRotation2.add(lifter2.rotation, 'y', -Math.PI, Math.PI, 0.001)
    // guiRotation2.add(lifter2.rotation, 'z', -Math.PI, Math.PI, 0.001)

    return {
        lifter1, lifter2, manualStat1, manualStat2, manualStat3,
        manualStat4, FAN_PSU, DIMM, AOI
    }
}

function onTransitionEnd (event) {
    event.target.remove()
}
