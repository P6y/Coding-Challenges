const map = (value, sourceMin, sourceMax, destinationMin, destinationMax) =>
    (value - sourceMin) / (sourceMax - sourceMin) * (destinationMax - destinationMin) + destinationMin

export class Drop {
    static colour = '#8a2be2'
    static width
    static height

    constructor () {
        setTimeout(() => this.#initialise(), 1_000 * Math.random())
    }

    #initialise () {
        this.x = Drop.width * Math.random()
        this.y = -20 * Math.random()
        this.z = 20 * Math.random()

        this.speed = map(this.z, 0, 20, 1, 20)
        this.length = map(this.z, 0, 20, 10, 20)
        this.gravity = map(this.z, 0, 20, 0, 0.2)
    }
    
    update () {
        this.y += this.speed
        this.speed += this.gravity
        
        if (this.y > Drop.height) this.#initialise()
    }

    draw (context) {
        context.strokeStyle = Drop.colour
        context.lineWidth = map(this.z, 0, 20, 1, 3)
        context.beginPath()
        context.moveTo(this.x, this.y)
        context.lineTo(this.x, this.y + this.length)
        context.stroke()
    }
}