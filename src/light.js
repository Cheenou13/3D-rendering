import * as THREE from 'three';

function createLights (){
    const ambientLight = new THREE.AmbientLight(0x404040, 0)
    const topLight = new THREE.DirectionalLight (0xffffff, 4)
    const bottomLight = new THREE.DirectionalLight (0xffffff, 5)

    bottomLight.position.set(0, -1, 0)
    topLight.position.set(0.5, 1, 0.5)

    return {ambientLight, topLight, bottomLight}
}

export { createLights }