import * as THREE from 'three';
import * as dat from 'dat.gui'
// const dimension = {
//     options: {
//         width: 1,
//         height: 1,
//         widthSegments: 1,
//         heightSegments: 1
//     }
// }


export function planeObject(texture){
    const texture_loader = new THREE.TextureLoader()
    const planeGeometry = new THREE.PlaneBufferGeometry(15, 13, 3, 3)
    const normalTexture = texture_loader.load(texture)
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

const dimension = {
    options: {
        width: 15,
        height: 15,
        widthSegments: 1,
        heightSegments: 1
    }
}

export class CreatePlanes {
    constructor (){
        this.material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            color: new THREE.Color(0xe0f4ff)
        })
        this.geometry = new THREE.PlaneGeometry(10, 10, 1 , 1)
        this.plane = new THREE.Mesh(this.material, this.geometry)
        this.texture_loader = new THREE.TextureLoader()
    }

    seeThroughPlane(){
        //TODO
    }

    concretePlane(){
        //TODO
    }

    loadTexturePlane(texture, color){
        /**
         * @texture - must be normalized first before passing to the parameter
         * @color - optional
         * @default color is ocean blue
         */
        const normalTexture = this.texture_loader.load(texture)
        this.material = new THREE.MeshPhongMaterial({
            side: THREE.DoubleSide,
            color: new THREE.Color(typeof color === 'undefined' ? 0xe0f4ff : color),
            flatShading: THREE.FlatShading,
            normalMap: normalTexture
        })
        this.plane = new THREE.Mesh(this.geometry, this.material)
        return this.plane
    }

    #chageDimension(object){
        object.geometry.dispose()
        object.geometry = new THREE.PlaneBufferGeometry(
            dimension.options.width,
            dimension.options.height,
            dimension.widthSegments,
            dimension.options.heightSegments
        )
    }

    controlFolder(object){
        const controls = new dat.GUI()
        const planeControl = controls.addFolder('Plane Dimension')
        planeControl.add(dimension.options, 'width', 0, 50, 0.1).onChange(object, this.#chageDimension)
        planeControl.add(dimension.options, 'height', 0, 50, 0.1).onChange(object, this.#chageDimension)
        planeControl.add(dimension.options, 'widthSegments', 0, 50, 0.1).onChange(object, this.#chageDimension)
        planeControl.add(dimension.options, 'heightSegments', 0, 50, 0.1).onChange(object, this.#chageDimension)
    }

    copyPlane(){
        return this.plane.copy()
    }
}