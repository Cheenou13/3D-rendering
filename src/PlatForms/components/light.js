import * as THREE from 'three';

function createLights (){
    // const ambientLight = new THREE.AmbientLight('white', 1)
    // const topLight = new THREE.DirectionalLight (0xffffff, 1)
    // const bottomLight = new THREE.DirectionalLight (0xffffff, 1)
    // const frontLight = new THREE.DirectionalLight (0xffffff, 1)
    // const backLight = new THREE.DirectionalLight (0xffffff, 1)

    // frontLight.position.set(5, 5, 5)
    // backLight.position.set(0, 0, -5)

    // bottomLight.position.set(0, -10, 0)
    // topLight.position.set(0, 10, 0)

    const pointLight1 = new THREE.PointLight('white', 1)
    const pointLight2 = new THREE.PointLight('white', 1)
    const pointLight3 = new THREE.PointLight('white', 1)
    const pointLight4 = new THREE.PointLight('white', 1)
    pointLight1.position.set(0, 30, 50)
    pointLight2.position.set(50, 10, 0)
    pointLight3.position.set(0, 10, -50)
    pointLight4.position.set(-50, 30, )

    return {pointLight1, pointLight2, pointLight3, pointLight4}
}

export { createLights }