
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { setupModel } from './setUp'

export async function loadModel() {

    const loader = new GLTFLoader()
    const loadedParent = await loader.loadAsync('importedModels/model.gltf')
    const {model, scene} = setupModel(loadedParent)

    return { model, scene }
}

