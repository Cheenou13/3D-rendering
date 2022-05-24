


export class ClickAndHold {
    tartget
    callback
    activeHoldTimeoutId
    isHeld
    delayTime
    /**
     * 
     * @param {EventTartget} target HTML element to apply the event
     * @param {Function} callback a call back function to process what to do with triggered event
     */
    constructor(target, callback, delay){
        this.tartget = target
        this.callback = callback
        this.isHeld = false
        this.activeHoldTimeoutId = null
        this.delayTime = delay 

        const start = ["touchstart", 'mousedown']
        const end = ["mouseup", "mouseleave", "mouseout", "touchend", "touchcancel"]
        start.forEach(type =>{
            this.tartget.addEventListener(type, this.#_onHoldStart.bind(this))
        })

        end.forEach(type =>{
            this.tartget.addEventListener(type, this.#_onHoldEnd.bind(this))
        })
        

    }

    #_onHoldStart () {
        //TODO
        this.isHeld = true
        this.activeHoldTimeoutId = setTimeout(() =>{
            if (this.isHeld) this.callback();
        }, this.delayTime)
    }
    #_onHoldEnd () {
        //TODO
        this.isHeld = false
        clearTimeout(this.activeHoldTimeoutId)
    }

    static apply (target, callback, delay){
        new ClickAndHold(target, callback, delay)
    }
}
