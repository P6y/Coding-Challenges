export default class Star {
    static colour = '#FFF'
    static width
    static height
    static size

    constructor () {
        this.#populate(Math.random() * Star.width)
    }

    #populate (z) {
        this.x = Math.random() * Star.width - 0.5 * Star.width
        this.y = Math.random() * Star.height - 0.5 * Star.height
        this.z = z ?? Star.width
    }

    update (decay) {
        this.z -= decay
        if (this.z <= 1) this.#populate()
    }

    #inBounds (value, limit) {
        return Math.abs(value) - Star.size <= limit * 0.5
    }

    draw (context) {
        const x = (this.x / (this.z - 1)) * Star.width
        if (!this.#inBounds(x, Star.width)) {
            this.#populate()
            return
        }

        const y = (this.y / (this.z - 1)) * Star.height
        if (!this.#inBounds(y, Star.height)) {
            this.#populate()
            return
        }

        const radius = Star.size - (this.z / Star.width * Star.size)

        context.beginPath()
        context.arc(x, y, radius, 0, 2 * Math.PI, false)
        context.fill()
    }
}