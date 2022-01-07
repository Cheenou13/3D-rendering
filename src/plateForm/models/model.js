
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { extractModel } from './setUp'

export async function loadModel() {

    const loader = new GLTFLoader()
    const loadedData = await loader.loadAsync('importedModels/model.gltf')
    const model = extractModel(loadedData)

    return model
}

