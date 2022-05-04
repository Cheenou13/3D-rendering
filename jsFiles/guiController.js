import { GUI } from 'dat.gui'
import * as THREE from 'three'
/*
This class intends for using the feature of GUI objects and modified it to work with
this project, DO NOT use it any where outside of this project
*/
export class GuiController extends GUI {
    // object
    // folderName
    #_MIN 
    #_MAX
    #_STEPS
    #guiFolder
    constructor(folderName){
        super()
        this.#guiFolder = this.makeGuiFolder(folderName)
        this.#_MAX = Math.PI*7
        this.#_MIN = - Math.PI*7
        this.#_STEPS = 0.001
    }
 
    /**
     * This method will create a new gui folder
     * @param {*} object - the object will be used for the gui
     * @param {*} folderName - the name of the folder (gui)
     */   
    makeGuiFolder(folderName){
        return this.addFolder(folderName) 
    }
    /**
     * 
     * @param {*} object - the object that will be added to the same gui folder, the position will be alter
     */
    addPosition(object){
        this.#guiFolder.add(object.position, 'x', this.#_MIN, this.#_MAX, this.#_STEPS)
        this.#guiFolder.add(object.position, 'y', this.#_MIN, this.#_MAX, this.#_STEPS)
        this.#guiFolder.add(object.position, 'z', this.#_MIN, this.#_MAX, this.#_STEPS)
    }
    /**
     * 
     * @param {*} object 
     */
    addRotation(object){
        this.#guiFolder.add(object.rotation, 'x', this.#_MIN, this.#_MAX, this.#_STEPS)
        this.#guiFolder.add(object.rotation, 'y', this.#_MIN, this.#_MAX, this.#_STEPS)
        this.#guiFolder.add(object.rotation, 'z', this.#_MIN, this.#_MAX, this.#_STEPS)
    }
    /**
     * 
     * @param {*} object - assuming object is a 3D object
     */
    changeShape(object, objectType){
        var width = object.geometry.parameters.width
        var height = object.geometry.parameters.height
        const dimension = {
            options: {
                height: height,
                width: width
            }
        }
        function changeDimension() {
            object.geometry.dispose()
            if (objectType === 'plane') {
                object.geometry = new THREE.PlaneGeometry(
                    dimension.options.width,
                    dimension.options.height
                )   
            }
            else {
                console.log("OBJECT IS NOT A PLANE TYPE")
            }
        }
        if (!this.#_MIN){
            console.log("MIN is undefine")
            return
        }
        this.#guiFolder.add(dimension.options, 'height', this.#_MIN, this.#_MAX, this.#_STEPS).onChange(changeDimension)
        this.#guiFolder.add(dimension.options, 'width', this.#_MIN, this.#_MAX, this.#_STEPS).onChange(changeDimension)
    }
}

