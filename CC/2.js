export const run = () => {
    // window setup
    const main = document.getElementById('main')
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const width = canvas.width = window.innerWidth
    const height = canvas.height = window.innerHeight

    const backgroundColour = '#000'
    const size = 300

    let iterations = 0
    let colour = 0

    const manger = (iterations, size, offsetX = 0, offsetY = 0) => {
        if (iterations == 0) {
            context.fillStyle = "hsl(" + colour + ", 100%, 50%)";
            colour += 5
            context.fillRect(-0.5 * size + offsetX, -0.5 * size + offsetY, size, size)
        } else {
            size /= 3
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    if (x == 0 && y == 0) continue
                    manger(iterations - 1, size, (size + 0.25) * x + offsetX, (size + 0.25) * y + offsetY)
                }
            }
        }
    }

    const draw = () => {
        context.fillStyle = backgroundColour
        context.fillRect(-0.5 * width, -0.5 * height, width, height)

        manger(iterations, size)
    }

    const doQueuedThrottle = (callback, delay = 50) => {
        let queued = false
        return () => {
            if (queued) return
            queued = true
            setTimeout(() => {
                callback()
                queued = false
            }, delay)
        }
    }

    const setup = () => {
        main.textContent = null
        main.appendChild(canvas)

        context.fillStyle = backgroundColour
        context.fillRect(0, 0, width, height)

        context.translate(0.5 * width, 0.5 * height)

        draw()

        const updateQueuedThrottle = doQueuedThrottle(draw, 75)

        document.body.addEventListener('keydown', ({key}) => {
            if (key === 'ArrowLeft' && iterations) iterations--
            if (key === 'ArrowRight') iterations++

            if (key === ' ') updateQueuedThrottle()
        })
    }

    setup()
}