let animationFrameId
const cells = []
export const stop = () => {
    cancelAnimationFrame(animationFrameId)
    cells.length = 0
}

export const run = async () => {
    // window setup
    const main = document.getElementById('main')
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const width = canvas.width = window.innerWidth
    const height = canvas.height = window.innerHeight

    const backgroundColour = '#222'

    let pause = false

    const {Cell} = await import('./6_cell.js')

    const update = () => {
        cells.forEach(cell => cell.update())
    }

    const draw = () => {
        // background
        context.fillStyle = backgroundColour
        context.fillRect(0, 0, width, height)

        cells.forEach(cell => cell.draw(context))
    }

    const loop = () => {
        if (!pause) {
            update()
            draw()
        }
        animationFrameId = requestAnimationFrame(loop)
    }

    const setup = () => {
        main.textContent = null
        main.appendChild(canvas)

        for (let i = 0; i < 3; i++)
            cells.push(new Cell(100 + (width - 200) * Math.random(), 100 + (height - 200) * Math.random()))

        document.body.addEventListener('keydown', ({key}) => {
			if (key === 'p') pause = !pause
			if (key === ' ') for (let i = cells.length - 1; i >= 0; i--) {
                cells.push(cells[i].mitosis())
                cells.push(cells[i].mitosis())
                cells.splice(i, 1)
            }
        })

        document.body.addEventListener('click', ({x, y}) => {
            for (let i = cells.length - 1; i >= 0; i--) {
                if (cells[i].isClicked(x, y)) {
                    cells.push(cells[i].mitosis())
                    cells.push(cells[i].mitosis())
                    cells.splice(i, 1)
                    break
                }
            }
        })

        requestAnimationFrame(loop)
    }

    setup()
}