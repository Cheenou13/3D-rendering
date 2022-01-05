import * as THREE from 'three';

// let planeGeometry
// let texture_loader
// let planeMaterial
// class planeObject {
//     constructor (container){
//         texture_loader = new THREE.TextureLoader()
//         planeGeometry = new THREE.PlaneBufferGeometry()
//         planeMaterial = new THREE.MeshStandardMaterial()
//     }
//     plane () {
//         const normalTexture = texture_loader.load('models/screenBackground/NormalMap.png')
        
//     }
// }

// const dimension = {
//     options: {
//         width: 1,
//         height: 1,
//         widthSegments: 1,
//         heightSegments: 1
//     }
// }


function planeObject(){
    const texture_loader = new THREE.TextureLoader()
    const planeGeometry = new THREE.PlaneBufferGeometry(1, 1, 1)
    const normalTexture = texture_loader.load('models/screenBackground/NormalMap.png')
    const planeMaterial = new THREE.MeshStandardMaterial({
        metalness: 0.7,
        roughness: 0.2,
        side: THREE.DoubleSide,
        flatShading: THREE.FlatShading,
        color: new THREE.Color(0xD6ECEA),
        normalMap: normalTexture
    })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    
    return plane
}

function changeDimension (dimension, shape){
    const plane = shape
    plane.geometry.dispose()
    plane.geometry = new THREE.PlaneBufferGeometry(
        dimension.options.width,
        dimension.options.height,
        dimension.options.widthSegments,
        dimension.heightSegments
    )
}

export { planeObject, changeDimension }