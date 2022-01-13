
import TextPlane from '@seregpie/three.text-plane';
import * as THREE from 'three';
import { BoxGeometry } from 'three';
import chroma from "chroma-js"



const dimension = {
    options: {
        width: 15,
        height: 15,
        widthSegments: 1,
        heightSegments: 1
    }
}

let data = {
    options: {
      data1: undefined,
      data2: undefined,
      data3: undefined,
      data4: undefined
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
    #getSingleText(status){
        const report = new TextPlane ({
            text: status
        })
        return report
    }
    getTextPlane(text){
        const status = this.#getSingleText(text)
        const textPlane = new TextPlane ({
            alignment: 'left',
            // color: 'green',
            backgroundColor: chroma('#073b4c').alpha(1/3).css(),
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: 0.2,
            paddingIndex: 1,
            text:[
                text == 'undefined' ? 'data1: testing' : 'data1: '+status.text,
                text == 'undefined' ? 'data2: testing' : 'data2: '+status.text,
                text == 'undefined' ? 'data3: testing' : 'data3: '+status.text,
                text == 'undefined' ? 'data4: testing' : 'data4: '+status.text
              ].join('\n')
        }, new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.7
          }))

        return textPlane
    }

    normalPlane(){
        this.material = new THREE.MeshPhongMaterial({
            color: 0x156289,
            emissive: 0x072534,
            side : THREE.DoubleSide,
            flatShading: true
        })
        this.geometry = new THREE.PlaneGeometry(5, 5, 10, 10)
        this.plane = new THREE.Mesh(this.geometry, this.material)
        return this.plane
    }

    loadTexturePlane(texture, color){
        /**
         * @texture - must be normalized first before passing to the parameter
         * @color - optional
         * @default color is ocean blue
         */
        const normalTexture = this.texture_loader.load(texture)
        this.geometry = new BoxGeometry(11, 8.5, 0.3)
        this.material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            color: new THREE.Color(typeof color === 'undefined' ? 0xe0f4ff : color),
            // flatShading: THREE.FlatShading,
            map: normalTexture
        })
        this.plane = new THREE.Mesh(this.geometry, this.material)
        this.plane.position.set(0, -1.5, 0)
        this.plane.rotation.set(-1.571, 0, 0.86)
    
        return this.plane
    }

    controlSize(object, controls, name){
        
        function changeDimension (){
            object.geometry.dispose()
            object.geometry = new THREE.PlaneBufferGeometry(
                dimension.options.width,
                dimension.options.height,
                dimension.widthSegments,
                dimension.options.heightSegments
            )
        }
        const control = controls.addFolder(name)
        control.add(dimension.options, 'width', 0, 50, 0.001).onChange(changeDimension)
        control.add(dimension.options, 'height', 0, 50, 0.001).onChange(changeDimension)
        control.add(dimension.options, 'widthSegments', 0, 50, 0.001).onChange(changeDimension)
        control.add(dimension.options, 'heightSegments', 0, 50, 0.001).onChange(changeDimension)
    }

    controlLocation(object, controls, name){

        const control = controls.addFolder(name)
        control.add(object.position, 'x', -Math.PI*2, Math.PI*2, 0.001)
        control.add(object.position, 'y', -Math.PI*2, Math.PI*2, 0.001)
        control.add(object.position, 'z', -Math.PI*2, Math.PI*2, 0.001)

    }

    changeFont (object, controls, name){
        const control = controls.addFolder(name)
        control.add(object, 'fontSize', 0, 5, 0.001)
    }    
    controlRotation(object, controls, name){

        const control = controls.addFolder(name)
        control.add(object.rotation, 'x', -Math.PI*2, Math.PI*2, 0.001)
        control.add(object.rotation, 'y', -Math.PI*2, Math.PI*2, 0.001)
        control.add(object.rotation, 'z', -Math.PI*2, Math.PI*2, 0.001)
    }

    cloePlane(){
        // TODO, make a copy of the same plane?
        //return this.plane.clone()
        
    }
}