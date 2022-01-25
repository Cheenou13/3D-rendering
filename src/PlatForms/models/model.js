
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { extractModel } from './setUp'
// import { oilTankURL, noColorMachine, talorMachine } from '../../LoadSrc/srcFiles'



let oilTank = 'src/importedModels/old_oil_tank_.2/scene.gltf'
let wishMach = 'src/importedModels/factory_machine_noColor/scene.gltf'
let productMach = 'src/importedModels/factory_machine/scene.gltf'
export async function loadModel() {

    const loader = new GLTFLoader()
    const 
    [
        oilTankD1, oilTankD2, wishMachD1, wishMachD2, wishMachD3, wishMachD4,
        productMachD1, productMachD2, productMachD3
    ] = await Promise.all([
        loader.loadAsync(oilTank), 
        loader.loadAsync(oilTank), 
        loader.loadAsync(wishMach),
        loader.loadAsync(wishMach),
        loader.loadAsync(wishMach),
        loader.loadAsync(wishMach),
        loader.loadAsync(productMach),
        loader.loadAsync(productMach),
        loader.loadAsync(productMach)
    ])
    
    const lifter1 = extractModel(oilTankD1)
    const lifter2 = extractModel(oilTankD2)

    lifter1.scale.set(0.013, 0.009, 0.013)
    lifter2.scale.set(0.013, 0.009, 0.013)

    const manualStat1 = extractModel(wishMachD1)
    const manualStat2 = extractModel(wishMachD2)
    const manualStat3 = extractModel(wishMachD3)
    const manualStat4 = extractModel(wishMachD4)

    manualStat1.scale.set(0.13, 0.10, 0.13)
    manualStat2.scale.set(0.13, 0.10, 0.13)
    manualStat3.scale.set(0.13, 0.10, 0.13)
    manualStat4.scale.set(0.13, 0.10, 0.13)

    const FAN_PSU = extractModel(productMachD1)
    const DIMM = extractModel(productMachD2)
    const AOI = extractModel(productMachD3)

    FAN_PSU.scale.set(0.38, 0.38, 0.38)
    DIMM.scale.set(0.38, 0.38, 0.38)
    AOI.scale.set(0.38, 0.38, 0.38)

    lifter1.rotation.set(-1.571, 0, 3.142)
    lifter1.position.set(-9.932, -1.44, 1.045)
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
    lifter2.rotation.set(-1.571, 0, 6.283)
    lifter2.position.set(9.932, -1.44, -5.34)

    return {
        lifter1, lifter2, manualStat1, manualStat2, manualStat3,
        manualStat4, FAN_PSU, DIMM, AOI
    }
}

