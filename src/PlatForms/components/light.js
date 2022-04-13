import * as THREE from 'three';

function createLights (){
    const pointLight1 = new THREE.PointLight('white', 1)
    const pointLight2 = new THREE.PointLight('white', 1)
    const pointLight3 = new THREE.PointLight('white', 1)
    const pointLight4 = new THREE.PointLight('white', 1)
    const ambientLight = new THREE.AmbientLight('white', 1.5)
    const hemiLight = new THREE.HemisphereLight('white', 'white', 0.6)
    const directLight = new THREE.DirectionalLight('white', 1)
    pointLight1.position.set(0, 30, 50)
    pointLight2.position.set(50, 10, 0)
    pointLight3.position.set(0, 10, -50)
    pointLight4.position.set(-50, 30, )

    hemiLight.color.setHSL(0.6, 1, 0.6)
    hemiLight.groundColor.setHSL(0.095, 1, 0.75)
    hemiLight.position.set(0, 0.25, 0)

    directLight.color.setHSL(0.1, 1, 0.95)
    directLight.position.set(-1, 1.75, 1)
    directLight.position.multiplyScalar(30)
    directLight.castShadow = true

    const dist = 50

    directLight.shadow.camera.left = - dist
    directLight.shadow.camera.left = dist
    directLight.shadow.camera.left = dist
    directLight.shadow.camera.left = - dist

    const groundGeo = new THREE.PlaneGeometry()



    return {pointLight1, pointLight2, pointLight3, pointLight4, ambientLight, hemiLight, directLight}
}

export { createLights }