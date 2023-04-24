export default class Drop {
    static #colour = '#0066cc'
    static width = 4
    static height = 10

    constructor (x, y) {
        this.x = x
        this.y = y
        this.toRemove = false
    }

    update (flowers, y) {
        this.y -= 5
        if (this.y < 0) return this.toRemove = true

        const flower = flowers.find(({size, x}) => Drop.height + size >= Math.sqrt((x - this.x) ** 2 + (y - this.y - 0.5 * Drop.height) ** 2))
        if (flower === undefined) return
        flower.hit()
        this.toRemove = true
    }
    
    
    draw (context) {
        context.fillStyle = Drop.#colour
        context.fillRect(this.x, this.y, Drop.width, Drop.height)
    }
}