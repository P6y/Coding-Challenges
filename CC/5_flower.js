export class Flower {
    static #colour = '#500070'
    static width
    static height
    static size = 25
    static speed = 2
    static y = 2 * this.size

    constructor (x) {
        this.size = 25
        this.x = x
        this.toRemove = false
    }

    update() {
        this.x += Flower.speed
    }

    static update (onEdge) {
        if (onEdge) {
            Flower.speed *= -1.05
            Flower.y += Flower.size
        }
    }

    hit () {
        console.debug('Splash')
        this.size -= 5
        if (this.size <= 0) this.toRemove = true
    }

    draw (context) {
        context.fillStyle = Flower.#colour
        context.beginPath()
        context.arc(this.x, Flower.y, this.size, 0, 2 * Math.PI)
        context.fill()
    }
}