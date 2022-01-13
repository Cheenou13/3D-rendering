
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { extractModel } from './setUp'

export async function loadModel(file) {

    const loader = new GLTFLoader()
    const loadedData = await loader.loadAsync(file)
    const model = extractModel(loadedData)

    model.rotation.z = 0.86
    model.position.set(0, -1.38, 0)

    return model
}

