import * as THREE from 'three';

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
    const planeGeometry = new THREE.PlaneBufferGeometry(9, 12, 1, 1)
    const normalTexture = texture_loader.load('importedModels/screenBackground/NormalMap.png')
    const planeMaterial = new THREE.MeshPhongMaterial({
        // metalness: 0.7, //-> MeshStandardMaterial
        // roughness: 0.2, //-> MeshStandardMaterial
        side: THREE.DoubleSide,
        flatShading: THREE.FlatShading,
        color: new THREE.Color(0x4D585A),
        // vertexColors: true,
        normalMap: normalTexture
    })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    
    return plane
}

// function changeDimension (dimension, shape){
//     const plane = shape
//     plane.geometry.dispose()
//     plane.geometry = new THREE.PlaneBufferGeometry(
//         dimension.options.width,
//         dimension.options.height,
//         dimension.options.widthSegments,
//         dimension.heightSegments
//     )
// }

export { planeObject }