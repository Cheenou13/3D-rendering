
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { extractModel } from './setUp'
import * as THREE from 'three'

let oilTank = 'importedModels/old_oil_tank_.2/scene.gltf'
let wishMach = 'importedModels/factory_machine_noColor/scene.gltf'
let productMach = 'importedModels/factory_machine/scene.gltf'
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
    
    const oilTank1 = extractModel(oilTankD1)
    const oilTank2 = extractModel(oilTankD2)

    oilTank1.scale.set(0.013, 0.009, 0.013)
    oilTank2.scale.set(0.013, 0.009, 0.013)

    const wishMach1 = extractModel(wishMachD1)
    const wishMach2 = extractModel(wishMachD2)
    const wishMach3 = extractModel(wishMachD3)
    const wishMach4 = extractModel(wishMachD4)

    wishMach1.scale.set(0.13, 0.10, 0.13)
    wishMach2.scale.set(0.13, 0.10, 0.13)
    wishMach3.scale.set(0.13, 0.10, 0.13)
    wishMach4.scale.set(0.13, 0.10, 0.13)

    const productMach1 = extractModel(productMachD1)
    const productMach2 = extractModel(productMachD2)
    const productMach3 = extractModel(productMachD3)

    productMach1.scale.set(0.38, 0.38, 0.38)
    productMach2.scale.set(0.38, 0.38, 0.38)
    productMach3.scale.set(0.38, 0.38, 0.38)

    const objects = new THREE.Group()
    objects.add(oilTank1) // lifter 1
    objects.add(oilTank2) // liefter 2

    objects.add(wishMach1) // manual station1
    objects.add(wishMach2) // manual station2
    objects.add(wishMach3) // manual station3
    objects.add(wishMach4) // manual station4

    objects.add(productMach1) // FAN/PSU
    objects.add(productMach2) // DIMM
    objects.add(productMach3) // AOI

    return objects
}

