import * as THREE from 'three';


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
        this.geometry = new THREE.PlaneGeometry(11, 8.5, 1 , 1)
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
        this.plane.position.set(0, -1.5, 0)
        this.plane.rotation.set(-1.571, 0, 0.86)
    
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
        control.add(dimension.options, 'width', 0, 50, 0.001).onChange(changeDimension)
        control.add(dimension.options, 'height', 0, 50, 0.001).onChange(changeDimension)
        control.add(dimension.options, 'widthSegments', 0, 50, 0.001).onChange(changeDimension)
        control.add(dimension.options, 'heightSegments', 0, 50, 0.001).onChange(changeDimension)
    }

    controlLocation(object, controls){

        const control = controls.addFolder('Plane Position')
        control.add(object.position, 'x', -Math.PI, Math.PI, 0.001)
        control.add(object.position, 'y', -Math.PI, Math.PI, 0.001)
        control.add(object.position, 'z', -Math.PI, Math.PI, 0.001)

    }

    controlRotation(object, controls){

        const control = controls.addFolder('Plane Rotation')
        control.add(object.rotation, 'x', -Math.PI, Math.PI, 0.001)
        control.add(object.rotation, 'y', -Math.PI, Math.PI, 0.001)
        control.add(object.rotation, 'z', -Math.PI, Math.PI, 0.001)
    }

    copyPlane(){
        return this.plane.copy()
    }
}