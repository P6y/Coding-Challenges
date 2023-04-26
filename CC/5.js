let animationFrameId
export const stop = () => cancelAnimationFrame(animationFrameId)

export const run = async () => {
    // window setup
    const main = document.getElementById('main')
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const width = canvas.width = window.innerWidth
    const height = canvas.height = window.innerHeight

    const backgroundColour = '#222'

    let pause = false
    let left = false
    let right = false
    let space = false

    const drops = []
    const flowers = []
    const {Flower} = await import('./5_flower.js')
    const {Ship} = await import('./5_ship.js')
    Ship.width = Flower.width = width
    Ship.height = Flower.height = height
    Ship.drops = drops
    const ship = new Ship()

    const update = () => {
        ship.update(right - left, space)
        for (let i = 0; i < drops.length; i++) drops[i].toRemove ? drops.splice(i, 1) : drops[i].update(flowers, Flower.y)
        for (let i = 0; i < flowers.length; i++) flowers[i].toRemove ? flowers.splice(i, 1) : flowers[i].update()
        Flower.update(flowers.some(({x}) => x + Flower.size >= width || x - Flower.size <= 0))
        if (Flower.y + Flower.size >= height) flowers.length = 0
    }

    const draw = () => {
        // background
        context.fillStyle = backgroundColour
        context.fillRect(0, 0, width, height)

        drops.forEach(drop => drop.draw(context))
        flowers.forEach(flower => flower.draw(context))
        ship.draw(context)
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

        const flowersInRow = Math.ceil((width - 200) / (2 * Flower.size + 50))
        const spacing = (width - 200) / (flowersInRow - 1) - 2 * Flower.size
        for (let i = 0; i < flowersInRow; i++) {
            flowers.push(new Flower(100 + i * (2 * Flower.size + spacing)))
        }

        canvas.addEventListener('keydown', ({key}) => {
			if (key === 'p') pause = !pause
			if (key === 'ArrowLeft') left = true
			if (key === 'ArrowRight') right = true
			if (key === ' ') space = true
        })

        canvas.addEventListener('keyup', ({key}) => {
			if (key === 'ArrowLeft') left = false
			if (key === 'ArrowRight') right = false
			if (key === ' ') space = false
        })

        requestAnimationFrame(loop)
    }

    setup()
}