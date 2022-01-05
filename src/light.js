import * as THREE from 'three';

function createLights (){
    const ambientLight = new THREE.AmbientLight(0x404040, 3)
    const topLight = new THREE.DirectionalLight (0xffffff, 3)
    const bottomLight = new THREE.DirectionalLight (0xffffff, 3)

    bottomLight.position.set(0, -1, 0)
    topLight.position.set(0, 1, 0)

    return {ambientLight, topLight, bottomLight}
}

export { createLights }