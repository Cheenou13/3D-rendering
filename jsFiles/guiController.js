import { GUI } from 'dat.gui'

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
    // #guiFolder
    constructor(folderName){
        this.makeGuiFolder(folderName)
        this.#_MAX = Math.PI*7
        this.#_MIN = - Math.PI*7
        this.#_STEPS = 0.01
    }
 
    /**
     * This medtho will create a new gui folder
     * @param {*} object - the object will be used for the gui
     * @param {*} folderName - the name of the folder (gui)
     */   
    makeGuiFolder(folderName){
        this.addFolder(folderName)
    }
    /**
     * 
     * @param {*} object - the object that will be added to the same gui folder, the position will be alter
     */
    addPosition(object){
        this.guiFolder.add(object.position, 'x', this.#_MIN, this.#_MAX, this.#_STEPS)
        this.guiFolder.add(object.position, 'y', this.#_MIN, this.#_MAX, this.#_STEPS)
        this.guiFolder.add(object.position, 'x', this.#_MIN, this.#_MAX, this.#_STEPS)
    }
    /**
     * 
     * @param {*} object 
     */
    addRotation(object){
        this.guiFolder.add(object.rotation, 'x', this.#_MIN, this.#_MAX, this.#_STEPS)
        this.guiFolder.add(object.rotation, 'y', this.#_MIN, this.#_MAX, this.#_STEPS)
        this.guiFolder.add(object.rotation, 'x', this.#_MIN, this.#_MAX, this.#_STEPS)
    }
    /**
     * 
     * @param {*} object - assuming object is a 3D object
     */
    changeShape(object){
        const dimension = {
            options: {

            }
        }
    }
}

