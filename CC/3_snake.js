export class Snake {
    static #colour = '#FFF'

    constructor (bounds, tileSize) {
        this.tileSize = tileSize
        this.tilesX = bounds.x / tileSize
        this.tilesY = bounds.y / tileSize

        this.x = this.tilesX / 2
        this.y = this.tilesY / 2
        this.direction = {x: 1, y: 0}

        this.rainbowmode = false
        this.hue = 0
        this.tail = []
        this.size = 0
    }

    setDirection(direction) {
        if (
            direction.x == 1 && this.direction.x == -1
            || direction.x == -1 && this.direction.x == 1
            || direction.y == 1 && this.direction.y == -1
            || direction.y == -1 && this.direction.y == 1
        ) return
        this.nextDirection = direction
    }

    #handleSize(food) {
        if (food.x == this.x && food.y == this.y) {
            this.size++
            food.update(this)
        }

        if (this.grow) {
            this.size++
            this.grow = false
        }
    }

    #handleTail() {
        if (this.size) {
            this.tail.unshift({x: this.x, y: this.y})
            this.tail = this.tail.slice(0, this.size)
        }
    }

    #handleMovement() {
        if (this.nextDirection) this.direction = this.nextDirection

        this.x += this.direction.x
        this.y += this.direction.y

        if (this.x >= this.tilesX) this.x = 0
        else if (this.x < 0) this.x = this.tilesX - 1
        if (this.y >= this.tilesY) this.y = 0
        else if (this.y < 0) this.y = this.tilesY - 1
    }

    #checkTailCollision() {
        if (this.tail.some(({x, y}) => x == this.x && y == this.y)) {
            this.size = 0
            this.tail = []
            this.rainbowmode = false
        }
    }

    update (food) {
        this.#handleSize(food)
        this.#handleTail()
        this.#handleMovement()
        this.#checkTailCollision()
        this.hue += 5
    }

    draw (context) {
        context.fillStyle = this.rainbowmode ? "hsl(" + this.hue + ", 100%, 80%)" : Snake.#colour
        context.fillRect(1 + this.x * this.tileSize, 1 + this.y * this.tileSize, this.tileSize - 2, this.tileSize - 2)
        
        this.tail.forEach(({x, y}, i) => {
            if (this.rainbowmode) context.fillStyle = "hsl(" + (this.hue + i * 5) + ", 100%, 75%)"
            if (this.size - i <= 3) {
                const pad = 7 - this.size + i
                context.fillRect(pad + x * this.tileSize, pad + y * this.tileSize, this.tileSize - 2 * pad, this.tileSize - 2 * pad)
            }
            else context.fillRect(3 + x * this.tileSize, 3 + y * this.tileSize, this.tileSize - 6, this.tileSize - 6)
        })
    }
}