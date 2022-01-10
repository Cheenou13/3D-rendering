import * as THREE from 'three';
import { GUI } from 'dat.gui';


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

const coordinates = {
    options: {
        x : 0, 
        y : 0,
        z : 0
    }
}

// const rotation = {
//     options: {
//         x : 0,
//         y : 0,
//         z : 0
//     }
// }

export class CreatePlanes {
    constructor (){
        this.material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            color: new THREE.Color(0xe0f4ff)
        })
        this.geometry = new THREE.PlaneGeometry(5, 5, 1 , 1)
        this.plane = new THREE.Mesh(this.geometry, this.material)
        this.texture_loader = new THREE.TextureLoader()
    }

    getPlane(){
        return this.plane
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

    controlSize(object, controls){
        
        function changeDimension (){
            object.geometry.dispose()
            object.geometry = new THREE.PlaneBufferGeometry(
                dimension.options.width,
                dimension.options.height,
                dimension.widthSegments,
                dimension.options.heightSegments
            )
        }
        const control = controls.addFolder('Plane Dimension')
        control.add(dimension.options, 'width', 0, 50, 0.01).onChange(changeDimension)
        control.add(dimension.options, 'height', 0, 50, 0.01).onChange(changeDimension)
        control.add(dimension.options, 'widthSegments', 0, 50, 0.01).onChange(changeDimension)
        control.add(dimension.options, 'heightSegments', 0, 50, 0.01).onChange(changeDimension)
    }

    controlLocation(object, controls){

        function planePosition(){
            object.position.set(
                coordinates.options.x,
                coordinates.options.y,
                coordinates.options.z
            )
        }
        const control = controls.addFolder('Plane Position')
        control.add(coordinates.options, 'x', -50, 50, 0.001).onChange(planePosition)
        control.add(coordinates.options, 'y', -50, 50, 0.001).onChange(planePosition)
        control.add(coordinates.options, 'z', -50, 50, 0.001).onChange(planePosition)

    }

    controlRotation(object, controls){

        function planeRotation() {
            object.rotation.set (
                coordinates.options.x,
                coordinates.options.y,
                coordinates.options.z
            )
        }
        const control = controls.addFolder('Plane Rotation')
        control.add(coordinates.options, 'x', -50, 50, 0.001).onChange(planeRotation)
        control.add(coordinates.options, 'y', -50, 50, 0.001).onChange(planeRotation)
        control.add(coordinates.options, 'z', -50, 50, 0.001).onChange(planeRotation)
    }

    copyPlane(){
        return this.plane.copy()
    }
}