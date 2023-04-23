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

    let previousTime = 0
    let pause = false

    const update = () => {

    }

    const draw = () => {
        // clear
        // context.clearRect(0.5 * width, 0.5 * height, width, height)
        context.clearRect(0, 0, width, height)

        // background
        context.fillStyle = backgroundColour
        // context.fillRect(0.5 * width, 0.5 * height, width, height)
        context.fillRect(0, 0, width, height)
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

        console.debug('_js')

        document.body.addEventListener('keydown', ({key}) => {
			if (key === 'p') pause = !pause
        })

        requestAnimationFrame(loop)
    }

    setup()
}