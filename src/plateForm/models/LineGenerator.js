import * as THREE from 'three'


const coordinates = {
    options : {
      x: 0,
      y: 0,
      z: 0
    }
  }

const position = {
    options : {
        x : 0,
        y : 0,
        z : 0
    }
}
  const length = {
      grows : {
          index: 0,
          x: 0,
          y: 0,
          z: 0
      }
  }

let points = []
let lineGeometry, linematerial, line

export class CreateLine{
    constructor(){
        points.push( new THREE.Vector3( -1, 1, 1))
        points.push( new THREE.Vector3( 1, 1, 1))
        points.push( new THREE.Vector3( -1, 1, 1))
        linematerial = new THREE.LineBasicMaterial()
        lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
        line = new THREE.Line(lineGeometry, linematerial)
    }

    getLine(){
        return line
    }
    #get2PI(){
        return Math.PI*2
    }
    rotationFolder(controls, object, name){
        const control = controls.addFolder(name)
        control.add(object.rotation, 'x', -this.#get2PI(), this.#get2PI(), 0.001)
        control.add(object.rotation, 'y', -this.#get2PI(), this.#get2PI(), 0.001)
        control.add(object.rotation, 'z', -this.#get2PI(), this.#get2PI(), 0.001)
    }
    lengthFolder(controls, object, name, index){
        function changeLength(){
            object.geometry.attributes.position.setXYZ(
                index,
                length.grows.x,
                length.grows.y,
                length.grows.z,
              )
              line.geometry.attributes.position.needsUpdate =true
        }
        const control = controls.addFolder(name)
        control.add(length.grows, 'x', -this.#get2PI(), this.#get2PI(), 0.001).onChange(changeLength)
        control.add(length.grows, 'y', -this.#get2PI(), this.#get2PI(), 0.001).onChange(changeLength)
        control.add(length.grows, 'z', -this.#get2PI(), this.#get2PI(), 0.001).onChange(changeLength)
        
    }
    positionFolder(controls, object, name){
        const control = controls.addFolder(name)
        control.add(object.position, 'x', -this.#get2PI(), this.#get2PI(), 0.001)
        control.add(object.position, 'y', -this.#get2PI(), this.#get2PI(), 0.001)
        control.add(object.position, 'z', -this.#get2PI(), this.#get2PI(), 0.001)
    }
}