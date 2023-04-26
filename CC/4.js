let animationFrameId
export const stop = () => cancelAnimationFrame(animationFrameId)

export const run = async () => {
    // window setup
    const main = document.getElementById('main')
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const width = canvas.width = window.innerWidth
    const height = canvas.height = window.innerHeight

    const backgroundColour = '#e6e6fa'
    const fps = 60
    const targetTime = 1_000 / fps

    let previousTime = 0
    let pause = false
    
    const {Drop} = await import('./4_drop.js')
    Drop.width = width
    Drop.height = height
    const countDrops = 500
    const drops = []

    const update = () => {
        drops.forEach(drop => drop.update())
    }
    
    const draw = () => {
        context.fillStyle = backgroundColour
        context.fillRect(0, 0, width, height)
        
        drops.forEach(drop => drop.draw(context))
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
        canvas.setAttribute('tabindex', 0)
        main.appendChild(canvas)
        canvas.focus()

        for (let i = 0; i < countDrops; i++) {
            drops[i] = new Drop()
        }

        canvas.addEventListener('keydown', ({key}) => {
			if (key === 'p') pause = !pause
        })

        requestAnimationFrame(loop)
    }

    setup()
}