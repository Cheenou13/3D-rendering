import * as THREE from 'three';

function createLights (){
    const ambientLight = new THREE.AmbientLight('white', 1)
    const topLight = new THREE.DirectionalLight (0xffffff, 1)
    const bottomLight = new THREE.DirectionalLight (0xffffff, 1)
    const frontLight = new THREE.DirectionalLight (0xffffff, 1)
    const backLight = new THREE.DirectionalLight (0xffffff, 1)

    frontLight.position.set(5, 5, 5)
    backLight.position.set(0, 0, -5)

    bottomLight.position.set(0, -10, 0)
    topLight.position.set(0, 10, 0)


    return {ambientLight, topLight, bottomLight, frontLight, backLight}
}

export { createLights }