
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { extractModel } from './setUp'
import { LoadingManager } from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GUI } from 'dat.gui'

let fanDIMMData = '/GLBModels/dracoFanDIMM.glb'
let lifterData = '/GLBModels/dracoLoader.glb'
let conveyorData = '/GLBModels/dracoConeyor.glb'
let manual_conveyorData = '/GLBModels/dracoManualConveyor.glb'
let loaderData = '/GLBModels/dracoLoader.glb'
let AOIData = 'GLBModels/dracoAOI.glb'

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
    const [lifter, fanDIMM, conveyor, manual_conveyor, loaderD, AOI] = 
    await Promise.all([
        loader.loadAsync(lifterData), 
        loader.loadAsync(fanDIMMData),
        loader.loadAsync(conveyorData),
        loader.loadAsync(manual_conveyorData),
        loader.loadAsync(loaderData),
        loader.loadAsync(AOIData)
    ])  
    const lifter1 = extractModel(lifter)
    const lifter2 = lifter1.clone()
 
    lifter1.scale.set(0.001, 0.001, 0.001) 
    lifter2.scale.set(0.001, 0.001, 0.001) 

    const conveyor1 = extractModel(conveyor)
    conveyor1.scale.set(0.001, 0.001, 0.001)
    const conveyor2 = conveyor1.clone()
    const conveyor3 = conveyor1.clone()
    const conveyor4 = conveyor1.clone()
    const conveyor5 = conveyor1.clone()
    const conveyor6 = conveyor1.clone()

    const manualConveyor1 = extractModel(manual_conveyor)
    manualConveyor1.scale.set(0.001, 0.001, 0.001)
    const manualConveyor2 = manualConveyor1.clone()
    const manualConveyor3 = manualConveyor1.clone()

    const manualStat1 = extractModel(loaderD)
    const manualStat2 = manualStat1.clone()
    const manualStat3 = manualStat1.clone()
    const manualStat4 = manualStat1.clone()

    manualStat1.scale.set(0.001, 0.001, 0.001)
    manualStat2.scale.set(0.001, 0.001, 0.001)
    manualStat3.scale.set(0.001, 0.001, 0.001)
    manualStat4.scale.set(0.001, 0.001, 0.001)

    const FAN_PSU = extractModel(fanDIMM)
    const DIMM = FAN_PSU.clone()
    const AOICopy = extractModel(AOI)

    FAN_PSU.scale.set(0.001, 0.001, 0.001)
    DIMM.scale.set(0.001, 0.001, 0.001)
    AOICopy.scale.set(0.001, 0.001, 0.001)

    lifter1.rotation.set(0, 0, Math.PI)
    manualStat1.position.set(-5.085, -2.023, -2.278)
    manualStat1.rotation.set(-1.571, 0, 4.701)
    FAN_PSU.position.set(-3.554, -1.4, -2.278)
    FAN_PSU.rotation.set(-1.571, 0, -1.571)

    changePosition(lifter1, -6, -1.275, -1.648, 0, 0, Math.PI)
    changePosition(lifter2, 6.459, -1.275, -1.648, 0, 0, Math.PI)
    changePosition(conveyor1, 5.38, -0.69, -1.225, -Math.PI, 0, 0)
    changePosition(manualConveyor1, 4.305, -0.69, -1.225, -Math.PI, 0, 0)
    changePosition(FAN_PSU, 2.149, 0.355, -1.658, -1.571, 1.571, 0)
    changePosition(conveyor2, 2.03, -0.69, -1.225, -Math.PI, 0, 0)
    changePosition(DIMM, -0.13, 0.355, -1.658, -1.571, 1.571, 0)
    changePosition(conveyor3, -0.25, -0.69, -1.225, -Math.PI, 0, 0)
    changePosition(manualConveyor2, -1.325, -0.69, -1.225, Math.PI, 0, 0)
    changePosition(manualConveyor3, -2.4, -0.69, -1.225, Math.PI, 0, 0)
    changePosition(conveyor4, -3.47, -0.69, -1.225, -Math.PI, 0, 0)
    changePosition(AOICopy, -5.42, -0.643, -1.648, -Math.PI, 0, 0)

    const guiPosition1 = folder.addFolder("Manual Conveyor 2 Position")
    const guiRotation1 = folder.addFolder("Manual Conveyor 2 Rotation")
    // const guiScale = folder.addFolder('conveyor1 scale')

    guiPosition1.add(AOICopy.position, 'x',-3*Math.PI, 3*Math.PI, 0.001)
    guiPosition1.add(AOICopy.position, 'y', -3*Math.PI, 3*Math.PI, 0.001)
    guiPosition1.add(AOICopy.position, 'z', -3*Math.PI, 3*Math.PI, 0.001)

    guiRotation1.add(AOICopy.rotation, 'x', -Math.PI, Math.PI, 0.001)
    guiRotation1.add(AOICopy.rotation, 'y', -Math.PI, Math.PI, 0.001)
    guiRotation1.add(AOICopy.rotation, 'z', -Math.PI, Math.PI, 0.001)

    // guiScale.add(conveyor1.scale, 'x', -0.1, 0.1, 0.00001)
    // guiScale.add(conveyor1.scale, 'y', -0.1, 0.1, 0.00001)
    // guiScale.add(conveyor1.scale, 'x', -0.1, 0.1, 0.00001)


    return {
        lifter1, lifter2, FAN_PSU, DIMM, AOICopy, conveyor1, 
        conveyor2, conveyor3, conveyor4, manualConveyor1, manualConveyor2,
        manualConveyor3
    }
}

function changePosition (object, x, y, z, x1, y1, z1){
    /**
     * @object - this is the 3D object
     * @xyz - these are the coordinates for change the @object position
     * @x1y1z1 - these are the coordinates for rotating the @object
     */
    object.position.set(x, y, z)
    object.rotation.set(x1, y1, z1)
}
function onTransitionEnd (event) {
    event.target.remove()
}
