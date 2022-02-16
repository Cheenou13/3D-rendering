
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { extractModel } from './setUp'
import { LoadingManager } from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GUI } from 'dat.gui'

let oilTank = '/GLBModels/oilTank.glb'
let wishMach = '/aoi_v6/liefter.glb'
let productMach = '/GLBModels/colored.glb'
let testModel = '/GLBModels/lieftCompressed.glb'

export async function loadModel() {
    const loadingManager = new LoadingManager (() => {
        const loadingScreen = document.getElementById('loading-screen')
        loadingScreen.classList.add('fade-out')
        loadingScreen.addEventListener('transitionend', onTransitionEnd)
    })
    const dracoLoader = new DRACOLoader ()
    dracoLoader.setDecoderPath('/static/')
    const loader = new GLTFLoader(loadingManager)
    loader.setDRACOLoader(dracoLoader)
    const [oilTankD1, wishMachD1, productMachD1] = 
    await Promise.all([
        loader.loadAsync(oilTank), 
        loader.loadAsync(testModel),
        loader.loadAsync(productMach)
    ])  
    const lifter1 = extractModel(oilTankD1)
    const lifter2 = lifter1.clone()
    const folder = new GUI ()
    const folder2 = new GUI ()
    const aoiGui = folder.addFolder("AOI Position")
    const aoiGui2 = folder2.addFolder("AOI Rotation")
 
    lifter1.scale.set(0.013, 0.009, 0.013)
    lifter2.scale.set(0.013, 0.009, 0.013)
    
    const manualStat1 = extractModel(wishMachD1)
    const manualStat2 = manualStat1.clone()
    const manualStat3 = manualStat1.clone()
    const manualStat4 = manualStat1.clone()

    manualStat1.scale.set(0.0013, 0.0010, 0.0013)
    console.log(manualStat1)
    manualStat2.scale.set(0.0013, 0.0010, 0.0013)
    manualStat3.scale.set(0.0013, 0.0010, 0.0013)
    manualStat4.scale.set(0.0013, 0.0010, 0.0013)

    const FAN_PSU = extractModel(productMachD1)
    const DIMM = FAN_PSU.clone()
    const AOI = FAN_PSU.clone()

    FAN_PSU.scale.set(0.38, 0.38, 0.38)
    DIMM.scale.set(0.38, 0.38, 0.38)
    AOI.scale.set(0.38, 0.38, 0.38)

    lifter1.rotation.set(-1.571, 0, 3.142)
    lifter1.position.set(-9.932, -1.44, 1.045)
    manualStat1.position.set(-4.617, -0.641, -1.529)
    manualStat1.rotation.set(0, 0, Math.PI)
    FAN_PSU.position.set(-3.554, -1.4, -2.278)
    FAN_PSU.rotation.set(-1.571, 0, -1.571)
    DIMM.position.set(-1.513, -1.4, -2.278)
    DIMM.rotation.set(-1.571, 0, -1.571)
    manualStat2.position.set(4.617, -0.641, -1.529)
    manualStat2.rotation.set(0, 0, Math.PI)
    manualStat3.position.set(1.77, -0.641, -1.529)
    manualStat3.rotation.set(0, 0, Math.PI)
    AOI.position.set(3.30, -1.4, -2.278)
    AOI.rotation.set(-1.571, 0, -1.571)
    manualStat4.position.set(5.12, -0.641, -1.529)
    manualStat4.rotation.set(0, 0, Math.PI)
    lifter2.rotation.set(-1.571, 0, 6.283)
    lifter2.position.set(9.932, -1.44, -5.34)


    aoiGui.add(manualStat1.position, 'x', -10, 10, 0.001)
    aoiGui.add(manualStat1.position, 'y', -10, 10, 0.001)
    aoiGui.add(manualStat1.position, 'z', -10, 10, 0.001)

    aoiGui2.add(manualStat1.rotation, 'x', -(Math.PI), Math.PI, 0.001)
    aoiGui2.add(manualStat1.rotation, 'y', -(Math.PI), Math.PI, 0.001)
    aoiGui2.add(manualStat1.rotation, 'z', -(Math.PI), Math.PI, 0.001)

    return {
        lifter1, lifter2, manualStat1, manualStat2, manualStat3,
        manualStat4, FAN_PSU, DIMM, AOI
    }
}

function onTransitionEnd (event) {
    event.target.remove()
}
