import * as THREE from 'three';

function createLights (){
    const ambientLight = new THREE.HemisphereLight('white', 5)
    const topLight = new THREE.DirectionalLight (0xffffff, 4)
    const bottomLight = new THREE.DirectionalLight (0xffffff, 5)
    const frontLight = new THREE.DirectionalLight (0xffffff, 4)
    const backLight = new THREE.DirectionalLight (0xffffff, 4)

    frontLight.position.set(10, 10, 10)
    backLight.position.set(10, 10, -10)

    bottomLight.position.set(0, -1, 0)
    topLight.position.set(0.5, 1, 0.5)


    return {ambientLight, topLight, bottomLight, frontLight, backLight}
}

export { createLights }