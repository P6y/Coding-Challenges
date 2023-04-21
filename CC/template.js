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

    const loop = () => {
        update()
        draw()
        requestAnimationFrame(loop)
    }

    const setup = () => {
        main.textContent = null
        main.appendChild(canvas)

        console.debug('_js')

        loop()
    }

    setup()
}