export class Cell {
    membrane = 6
    constructor (x, y, size, colour) {
        this.x = x
        this.y = y
        this.size = size ?? 100
        this.colour = colour ?? `rgba(${55 + 100 * Math.random()}, ${200 + 55 * Math.random()}, 0, 0.7)`
    }

    isClicked (x, y) {
        return Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2) <= this.size
    }

    mitosis () {
        return new Cell(
            this.x - 0.5 * this.size + Math.random() * this.size,
            this.y - 0.5 * this.size + Math.random() * this.size,
            0.75 * this.size,
            this.colour)
    }

    update () {
        const angle = 2 * Math.random() * Math.PI
        this.x += Math.cos(angle)
        this.y += Math.sin(angle)
    }


    draw (context) {
        context.strokeStyle = '#22aa00'
        context.lineWidth = this.membrane
        context.fillStyle = this.colour
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
        context.fill()
        context.stroke()
    }
}