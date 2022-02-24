
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { extractModel } from './setUp'
import { LoadingManager, Object3D } from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GUI } from 'dat.gui'

let fanDIMMData = '/GLBModels/dracoFanDim.glb'
let lifterDataR = '/GLBModels/dracoLoader.glb'
let lifterDataL = '/GLBModels/dracoLeftLoader.glb'
let stackCartDataR = '/GLBModels/cartStacker.glb'
let conveyorData = '/GLBModels/dracoConveyorV2.glb'
let manual_conveyorData = '/GLBModels/dracoManaulConveyorV2.glb'
let AOIData = 'GLBModels/dracoAOI.glb'

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
    const [rightLifterD, leftLifterD, stackCartD, fanDIMM, conveyor, manual_conveyor, AOI] = 
    await Promise.all([
        loader.loadAsync(lifterDataR),
        loader.loadAsync(lifterDataL),
        loader.loadAsync(stackCartDataR),
        loader.loadAsync(fanDIMMData),
        loader.loadAsync(conveyorData),
        loader.loadAsync(manual_conveyorData),
        loader.loadAsync(AOIData)
    ])  
    const rightLifter = extractModel(rightLifterD)
    const leftLifter = extractModel(leftLifterD)
    rightLifter.scale.set(0.001, 0.001, 0.001)
    leftLifter.scale.set(0.001, 0.001, 0.001) 

    const stackCartR = extractModel(stackCartD)
    stackCartR.scale.set(0.001, 0.001, 0.001)
    const stackCartL = stackCartR.clone()

    
    const conveyor1 = extractModel(conveyor)
    conveyor1.scale.set(0.001, 0.001, 0.001)
    conveyor1.rotation.set(-Math.PI, 0, 0)
    const conveyor2 = conveyor1.clone()
    const conveyor3 = conveyor1.clone()
    const conveyor4 = conveyor1.clone()
    const conveyor5 = conveyor1.clone()
    const conveyor6 = conveyor1.clone()

    const manualConveyor1 = extractModel(manual_conveyor)
    manualConveyor1.scale.set(0.001, 0.001, 0.001)
    manualConveyor1.rotation.set(-Math.PI, 0, 0)
    const manualConveyor2 = manualConveyor1.clone()
    const manualConveyor3 = manualConveyor1.clone()
    const manualConveyor4 = manualConveyor1.clone()


    const FAN_PSU = extractModel(fanDIMM)
    const DIMM = FAN_PSU.clone()
    const AOICopy = extractModel(AOI)

    FAN_PSU.scale.set(0.001, 0.001, 0.001)
    DIMM.scale.set(0.001, 0.001, 0.001)
    AOICopy.scale.set(0.001, 0.001, 0.001)

    changePosition(stackCartR, 9, -1.048, -2.272, 0, 0, Math.PI)
    changePosition(rightLifter, 8.155, -1.275, -2.272, 0, 0, Math.PI)
    changePosition(conveyor1, 7.075, -0.69, -1.624, -Math.PI, 0, 0)
    changePosition(manualConveyor1, 5.993, -0.69, -1.624, -Math.PI, 0, 0)
    changePosition(FAN_PSU, 3.824, 0.355, -2.282, -1.571, 1.571, 0)
    changePosition(conveyor2, 3.695, -0.69, -1.624, -Math.PI, 0, 0)
    changePosition(DIMM, 1.537, 0.355, -2.282, -1.571, 1.571, 0)
    changePosition(conveyor3, 1.415, -0.69, -1.624, -Math.PI, 0, 0)
    changePosition(manualConveyor2, 0.325, -0.69, -1.624, Math.PI, 0, 0)
    changePosition(manualConveyor3, -0.76, -0.69, -1.624, Math.PI, 0, 0)
    changePosition(conveyor4, -1.84, -0.69, -1.624, -Math.PI, 0, 0)
    changePosition(AOICopy, -3.795, -0.643, -2.272, -Math.PI, 0, 0)
    changePosition(conveyor5, -3.925, -0.69, -1.624, -Math.PI, 0, 0)
    changePosition(manualConveyor4, -5.01, -0.69, -1.624, Math.PI, 0, 0)
    changePosition(conveyor6, -6.09, -0.69, -1.624, -Math.PI, 0, 0)
    changePosition(leftLifter, -7.095, -1.275, -2.272, 0, 0, Math.PI)
    changePosition(stackCartL, -8.1, -1.048, -2.272, 0, 0, Math.PI)

    // positionAdjustment(stackCartR, "stackCartR")
    // positionAdjustment(conveyor4, "conveyor4")
    // positionAdjustment(AOICopy, "AOICopy")
    // positionAdjustment(conveyor5, "conveyor5")
    // positionAdjustment(manualConveyor4, "manualConveyor4")
    // positionAdjustment(conveyor6, "conveyor6")
    // positionAdjustment(leftLifter, "leftLifter")
    // positionAdjustment(stackCartL, "stackCartL")


    return {
        rightLifter, leftLifter, stackCartR, stackCartL, FAN_PSU, DIMM, AOICopy, 
        conveyor1, conveyor2, conveyor3, conveyor4, conveyor5, conveyor6,
        manualConveyor1, manualConveyor2, manualConveyor3, manualConveyor4
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

function positionAdjustment (object, name){
    const folder = new GUI ()
    const objectPosition = folder.addFolder(name +" Position")
    objectPosition.add(object.position, 'x',-3*Math.PI, 3*Math.PI, 0.001)
    objectPosition.add(object.position, 'y', -3*Math.PI, 3*Math.PI, 0.001)
    objectPosition.add(object.position, 'z', -3*Math.PI, 3*Math.PI, 0.001)

}
function onTransitionEnd (event) {
    event.target.remove()
}
