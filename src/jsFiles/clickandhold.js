


export class ClickAndHold {
    tartget
    callback
    activeHoldTimeoutId
    isHeld
    /**
     * 
     * @param {EventTartget} target HTML element to apply the event
     * @param {Function} callback a call back function to process what to do with triggered event
     */
    constructor(target, callback){
        this.tartget = target
        this.callback = callback
        this.isHeld = false
        this.activeHoldTimeoutId = null

        const start = ["mousedown", "touchstart"]
        const end = ["mouseup", "mouseleave", "mouseout", "touchend", "touchcancel"]
        start.forEach(type =>{
            this.tartget.addEventListener(type, this._onHoldStart.bind(this))
        })

        end.forEach(type =>{
            this.tartget.addEventListener(type, this._onHoldEnd.bind(this))
        })
        

    }

    _onHoldStart () {
        //TODO
        this.isHeld = true
        this.activeHoldTimeoutId = setTimeout(() =>{
            if (this.isHeld) this.callback();
        }, 1000)
    }
    _onHoldEnd () {
        //TODO
        this.isHeld = false
        clearTimeout(this.activeHoldTimeoutId)
    }

    static apply (target, callback){
        new ClickAndHold(target, callback)
    }
}
