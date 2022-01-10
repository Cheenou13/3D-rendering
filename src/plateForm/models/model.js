
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { extractModel } from './setUp'

export async function loadModel() {

    const loader = new GLTFLoader()
    const loadedData = await loader.loadAsync('importedModels/model.gltf')
    const model = extractModel(loadedData)
    model.position.set(0, -1.03, -0.97)
    model.rotation.set(-1.176, 0, -1.173)
    return model
}

