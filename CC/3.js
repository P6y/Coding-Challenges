let animationFrameId
export const stop = () => cancelAnimationFrame(animationFrameId)

export const run = async () => {
    // window setup
    const main = document.getElementById('main')
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const width = canvas.width = window.innerWidth
    const height = canvas.height = window.innerHeight

    const backgroundColour = '#000'
    const fps = 10
    const targetTime = 1_000 / fps
    const bounds = {x: 400, y: 400}
    const tileSize = 20
    
    let boundsHue = 0
    let previousTime = 0
    let grow = false
    let pause = false

    const {Snake} = await import('./3_snake.js')
    const python = new Snake(bounds, tileSize)

    const {Food} = await import('./3_food.js')
    const food = new Food(bounds, tileSize)

    const update = () => {
        if (grow) python.grow = true
        python.update(food)
    }

    const draw = () => {
        context.fillStyle = backgroundColour
        context.fillRect(-0.5 * (width - bounds.x), -0.5 * (height - bounds.y), width, height)
        
        context.fillStyle = "hsl(" + boundsHue++ + ", 100%, 15%)";
        context.fillRect(0, 0, bounds.x, bounds.y)

        food.draw(context)
        python.draw(context)
    }

    const loop = timestamp => {
        if (!pause) {
            const deltaTime = timestamp - previousTime
            if (deltaTime >= targetTime) {
                previousTime = timestamp
                update()
                draw()
            }
        }
        animationFrameId = requestAnimationFrame(loop)
    }

    const setup = () => {
        main.textContent = null
        main.appendChild(canvas)

        context.translate(0.5 * (width - bounds.x), 0.5 * (height - bounds.y))

        document.body.addEventListener('keydown', ({key}) => {
            if (key === 'ArrowLeft') python.setDirection({x: -1, y: 0})
			if (key === 'ArrowUp') python.setDirection({x: 0, y: -1})
			if (key === 'ArrowRight') python.setDirection({x: 1, y: 0})
			if (key === 'ArrowDown') python.setDirection({x: 0, y: 1})

			if (key === 'p') pause = !pause
			if (key === '+') grow = true
			if (key === '-') grow = false
        })

        requestAnimationFrame(loop)
    }

    setup()
}