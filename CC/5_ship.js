import Drop from './5_drop.js'

export class Ship {
    static #colour = 'white'
    static width
    static height
    static drops

    constructor () {
        this.x = 0.5 * Ship.width
        this.size = 40
    }

    update (speed, shot) {
        this.x += speed * 5
        if (this.x + this.size > Ship.width) this.x = Ship.width - this.size
        else if (this.x - this.size < 0) this.x = this.size

        if (shot === false || this.reloading) return
        this.reloading = true
        setTimeout(() => {
            this.reloading = false
        }, 400)
        Ship.drops.push(new Drop(this.x - 0.5 * Drop.width, Ship.height - this.size))
    }


    draw (context) {
        context.fillStyle = Ship.#colour
        // context.fillRect(this.x - 0.5 * this.size, Ship.height - this.size, this.size, this.size)
        context.beginPath()
        context.moveTo(this.x - 0.5 * this.size, Ship.height)
        context.lineTo(this.x, Ship.height - this.size)
        context.lineTo(this.x + 0.5 * this.size, Ship.height)
        context.fill()
    }
}