export class Food {
    static #colour = '#b22222'

    constructor (bounds, tileSize) {
        this.tileSize = tileSize
        this.tilesX = bounds.x / tileSize
        this.tilesY = bounds.y / tileSize
        this.#setPosition()
    }

    #setPosition () {
        this.x = Math.floor(Math.random() * this.tilesX)
        this.y = Math.floor(Math.random() * this.tilesY)
    }

    update (snake) {
        do
        this.#setPosition()
        while (snake.x == this.x && snake.y == this.y || snake.tail.some(({x, y}) => x == this.x && y == this.y))
    }


    draw (context) {
        context.fillStyle = Food.#colour
        context.fillRect(3 + this.x * this.tileSize, 3 + this.y * this.tileSize, this.tileSize - 6, this.tileSize - 6)
    }
}