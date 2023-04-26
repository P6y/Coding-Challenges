let animationFrameId
export const stop = () => cancelAnimationFrame(animationFrameId)

export const run = async () => {
    // window setup
    const main = document.getElementById('main')
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const width = canvas.width = window.innerWidth
    const height = canvas.height = window.innerHeight

    // settings
    const backgroundColour = '#000'
    const stepRangeNormal = 0.25
    const stepRangeSmall = 0.05
    const stepRangeBig = 2.5
    const minSize = 0
    const maxSize = 25
    const minDecay = 0
    const maxDecay = 50

    let stepRange = stepRangeNormal
    let size = 2.5
    let decay = 1.75

    // keys
    let pause = false
    let shift = false
    let control = false
    let left = false
    let up = false
    let right = false
    let down = false

    // star
    const {Star} = await import('./1_star.js')
    const stars = []
    const count = 500

    const update = () => {
        if (left || right || up || down) { // guard => stepRange = stepRangeNormal
            if (shift) stepRange = stepRangeSmall
            else if (control) stepRange = stepRangeBig

            if (left ^ right) {
                if (left) {
                    if (decay - stepRange <= minDecay) decay = minDecay
                    else decay -= stepRange
                } else {
                    if (decay + stepRange >= maxDecay) decay = maxDecay
                    else decay += stepRange
                }
            }

            if (up ^ down) {
                if (up) {
                    if (size + stepRange >= maxSize) size = maxSize
                    else size += stepRange
                } else {
                    if (size - stepRange <= minSize) size = minSize
                    else size -= stepRange
                }
                Star.size = size
            }
        } else {
            stepRange = stepRangeNormal
        }

        for (let i = 0; i < stars.length; i++) stars[i].update(decay)
    }

    const draw = () => {
        context.fillStyle = "rgba(0, 0, 0, 0.5)"
        context.fillRect(-0.5 * width, -0.5 * height, width, height)
    
        context.fillStyle = Star.colour
        for (let i = 0; i < stars.length; i++) stars[i].draw(context)
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
        canvas.setAttribute('tabindex', 0)
        main.appendChild(canvas)
        canvas.focus()

        context.fillStyle = backgroundColour
        context.fillRect(0, 0, width, height)

        // centre screen
        context.translate(0.5 * width, 0.5 * height)

        // initialize stars
        Star.width = width
        Star.height = height
        Star.size = size
        for (let i = 0; i < count; i++) stars[i] = new Star()

        // attach listeners
        canvas.addEventListener('keydown', ({key}) => {
            if (key === 'Shift') shift = true
            if (key === 'Control' || key === 'Alt') control = true

            if (key === 'ArrowLeft') left = true
            if (key === 'ArrowUp') up = true
            if (key === 'ArrowRight') right = true
            if (key === 'ArrowDown') down = true
        })

        canvas.addEventListener('keyup', ({key}) => {
            if (key === 'p') pause = !pause
            if (key === 'Shift') shift = false
            if (key === 'Control' || key === 'Alt') control = false

            if (key === 'ArrowLeft') left = false
            if (key === 'ArrowUp') up = false
            if (key === 'ArrowRight') right = false
            if (key === 'ArrowDown') down = false
        })

        requestAnimationFrame(loop)
    }

    setup()
}
