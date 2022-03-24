
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { extractModel } from './setUp'
import { LoadingManager, Object3D, AnimationClip, AnimationMixer} from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GUI } from 'dat.gui'

let fanDIMMFile = '/GLBModels/Machines/dracoFanDim.glb'
let lifterRightFile = '/GLBModels/Machines/dracoLoader.glb'
let lifterLeftFile = '/GLBModels/Machines/dracoLeftLoader.glb'
let stackCartFile = '/GLBModels/Machines/cartStacker.glb'
let conveyorFile = '/GLBModels/Machines/dracoConveyorV2.glb'
let manualConveyorFile = '/GLBModels/Machines/dracoManaulConveyorV2.glb'
let AOIFile = 'GLBModels/Machines/dracoAOI.glb'
let employeeData = '/GLBModels/dracoPerson.glb'
let carryingPoseFile = '/GLBModels/EmployeePoses/carryingPoseDraco.glb'
let grabPoseFile = '/GLBModels/EmployeePoses/grabPoseDraco.glb'
let workingPose = '/GLBModels/EmployeePoses/workingPoseDraco.glb'
let animationFile = '/GLBModels/EmployeePoses/operatingAnimationV2.glb'

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
    const [rightLifterD, leftLifterD, stackCartD, fanDIMM, 
           conveyor, manual_conveyor, AOI, animitionData, animitionData1, 
           animitionData2, animitionData3
    ] = await Promise.all([
        loader.loadAsync(lifterRightFile),
        loader.loadAsync(lifterLeftFile),
        loader.loadAsync(stackCartFile),
        loader.loadAsync(fanDIMMFile),
        loader.loadAsync(conveyorFile),
        loader.loadAsync(manualConveyorFile),
        loader.loadAsync(AOIFile),
        // loader.loadAsync(employeeData),
        // loader.loadAsync(carryingPoseFile),
        // loader.loadAsync(grabPoseFile),
        // loader.loadAsync(workingPose),
        loader.loadAsync(animationFile),
        loader.loadAsync(animationFile),
        loader.loadAsync(animationFile),
        loader.loadAsync(animationFile)
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

    /*****************************Animation Section********************************/
    const clips = animitionData.animations
    const clips1 = animitionData1.animations
    const clips2 = animitionData2.animations
    const clips3 = animitionData3.animations

    const operatingAnime = extractModel(animitionData)
    operatingAnime.scale.set(0.9, 0.9, 0.9)
    const mixer = generateMixer(operatingAnime, clips)
    operatingAnime.position.set(-5.39, -1.35, -1.23)
    operatingAnime.rotation.set(0, 3.13, 0)
    
    const operator1 = extractModel(animitionData1)
    operator1.scale.set(0.9, 0.9, 0.9)
    const mixer1 = generateMixer(operator1, clips1)
    operator1.position.set(-1.23, -1.35, -1.23)
    operator1.rotation.set(0, 3.13, 0)

    const operator2 = extractModel(animitionData2)
    operator2.scale.set(0.9, 0.9, 0.9)
    const mixer2 = generateMixer(operator2, clips2)
    operator2.position.set(-0.15, -1.35, -1.23)
    operator2.rotation.set(0, 3.13, 0)

    const operator3 = extractModel(animitionData3)
    operator3.scale.set(0.9, 0.9, 0.9)
    const mixer3 = generateMixer(operator3, clips3)
    operator3.position.set(5.63, -1.35, -1.23)
    operator3.rotation.set(0, 3.13, 0)
    /******************************************************************************/


    changePosition(stackCartR, 9, -1.032, -2.272, 0, 0, Math.PI)
    changePosition(rightLifter, 8.155, -1.23, -2.272, 0, 0, Math.PI)
    changePosition(conveyor1, 7.075, -0.65, -1.624, -Math.PI, 0, 0)
    changePosition(manualConveyor1, 5.993, -0.65, -1.624, -Math.PI, 0, 0)
    changePosition(FAN_PSU, 3.824, 0.4, -2.282, -1.571, 1.571, 0)
    changePosition(conveyor2, 3.695, -0.65, -1.624, -Math.PI, 0, 0)
    changePosition(DIMM, 1.537, 0.4, -2.282, -1.571, 1.571, 0)
    changePosition(conveyor3, 1.415, -0.65, -1.624, -Math.PI, 0, 0)
    changePosition(manualConveyor2, 0.325, -0.65, -1.624, Math.PI, 0, 0)
    changePosition(manualConveyor3, -0.76, -0.65, -1.624, Math.PI, 0, 0)
    changePosition(conveyor4, -1.84, -0.65, -1.624, -Math.PI, 0, 0)
    changePosition(AOICopy, -3.795, -0.60, -2.272, -Math.PI, 0, 0)
    changePosition(conveyor5, -3.925, -0.65, -1.624, -Math.PI, 0, 0)
    changePosition(manualConveyor4, -5.01, -0.65, -1.624, Math.PI, 0, 0)
    changePosition(conveyor6, -6.09, -0.65, -1.624, -Math.PI, 0, 0)
    changePosition(leftLifter, -7.095, -1.23, -2.272, 0, 0, Math.PI)
    changePosition(stackCartL, -8.1, -1.032, -2.272, 0, 0, Math.PI)

    return {
        rightLifter, leftLifter, stackCartR, stackCartL, FAN_PSU, DIMM, AOICopy, 
        conveyor1, conveyor2, conveyor3, conveyor4, conveyor5, conveyor6,
        manualConveyor1, manualConveyor2, manualConveyor3, manualConveyor4, operatingAnime,
        operator1, operator2, operator3, mixer, mixer1, mixer2, mixer3
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
    const objectRotation = folder.addFolder(name +" Rotation")
    objectPosition.add(object.position, 'x',-3*Math.PI, 3*Math.PI, 0.001)
    objectPosition.add(object.position, 'y', -3*Math.PI, 3*Math.PI, 0.001)
    objectPosition.add(object.position, 'z', -3*Math.PI, 3*Math.PI, 0.001)

    objectRotation.add(object.rotation, 'x',-3*Math.PI, 3*Math.PI, 0.001)
    objectRotation.add(object.rotation, 'y', -3*Math.PI, 3*Math.PI, 0.001)
    objectRotation.add(object.rotation, 'z', -3*Math.PI, 3*Math.PI, 0.001)

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