import * as THREE from 'three'
import chroma from "chroma-js"
import TextTexture from '@seregpie/three.text-texture'


const dimension = {
    options: {
        width: 15,
        height: 15,
        diameter: 0.3,
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

    getTextPlane(machine){
        let name = ''
        if (
            machine.name == 'Manual Station 1' ||
            machine.name == 'Manual Station 2' ||
            machine.name == 'Manual Station 3' ||
            machine.name == 'Manual Station 4' 
            ) name = 'MS'
        else name = machine.name
    
        let texture = new TextTexture({
            alignment: 'left',
            backgroundColor: chroma('#073b4c').alpha(1/3).css(),
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: 30,
            fontStyle: 'italic',
            padding: 0.2,
            text: [
              'Name: ' + name,
              'Status: ' + machine.status,
              'Power: ' + machine.Power
        
            ].join('\n'),
          });
          let material = new THREE.SpriteMaterial({
            map: texture,
            side: THREE.DoubleSide
          });
          let textPlane = new THREE.Sprite(material);
          texture.redraw();
          textPlane.scale.setY(texture.height / texture.width);


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
        this.geometry = new THREE.BoxGeometry(15.67, 9.6, 0.224)
        this.material = new THREE.MeshPhysicalMaterial({
            side: THREE.DoubleSide,
            color: new THREE.Color(typeof color === 'undefined' ? 0xe0f4ff : color),
            flatShading: THREE.FlatShading,
            map: normalTexture
        })
        this.plane = new THREE.Mesh(this.geometry, this.material)
        this.plane.position.set(0, -1.5, -2)
        this.plane.rotation.set(-1.571, 0, 0)
    
        return this.plane
    }

    controlSize(object, controls, name){
        
        function changeDimension (){
            object.geometry.dispose()
            object.geometry = new THREE.BoxGeometry(
                dimension.options.width,
                dimension.options.height,
                dimension.options.diameter
            )
        }
        const control = controls.addFolder(name)
        control.add(dimension.options, 'width', 0, 50, 0.001).onChange(changeDimension)
        control.add(dimension.options, 'height', 0, 50, 0.001).onChange(changeDimension)
        control.add(dimension.options, 'diameter', 0, 50, 0.001).onChange(changeDimension)
    }

    controlLocation(object, controls, name){

        const control = controls.addFolder(name)
        control.add(object.position, 'x', -Math.PI*2, Math.PI*2, 0.001)
        control.add(object.position, 'y', -Math.PI*2, Math.PI*2, 0.001)
        control.add(object.position, 'z', -Math.PI*2, Math.PI*2, 0.001)

    }  
    controlRotation(object, controls, name){

        const control = controls.addFolder(name)
        control.add(object.rotation, 'x', -Math.PI*2, Math.PI*2, 0.001)
        control.add(object.rotation, 'y', -Math.PI*2, Math.PI*2, 0.001)
        control.add(object.rotation, 'z', -Math.PI*2, Math.PI*2, 0.001)
    }

}