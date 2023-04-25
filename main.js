const initaliseChallenges = () =>
    [
        [1, 'Starfield'],
        [2, '2D Manger Sponge Fractal'],
        [3, 'Snake'],
        [4, 'Purple Rain'],
        [5, 'Flower Invaders (Space Invader)'],
        [6, 'Mitosis Simulation'],
    ].reduce(
        (accumulator, currentValue) => (
            currentValue.forEach((element, index) => accumulator[index].push(element)),
            accumulator
        ),
        [[], []]
    )

const initialiseDisplay = () => {
    const number = document.getElementById('number')
    const name = document.getElementById('name')
    return (id, challenge) => {
        number.textContent = id
        name.textContent = challenge
    }
}

const loadChallenge = async index => {
     try {
        return await import(`./CC/${index}.js`)
     } catch (error) {
        console.error(error)
     }
}

const main = () => {
    const [challengeIds, challengeNames] = initaliseChallenges()
    let challengeIndex = challengeIds.length - 1
    let activeChallenge = {}

    const setChallengeDisplay = initialiseDisplay()
    setChallengeDisplay(challengeIds[challengeIndex], challengeNames[challengeIndex])

    if (true) (async () => {
        activeChallenge = await loadChallenge(challengeIds[challengeIndex])
        activeChallenge.run()
    })()

    document.getElementById('previous').addEventListener('click', () => {
        if (--challengeIndex < 0) challengeIndex = challengeIds.length - 1
        setChallengeDisplay(challengeIds[challengeIndex], challengeNames[challengeIndex])
    })
    
    document.getElementById('next').addEventListener('click', () => {
        if (++challengeIndex >= challengeIds.length) challengeIndex = 0
        setChallengeDisplay(challengeIds[challengeIndex], challengeNames[challengeIndex])
    })

    document.getElementById('load').addEventListener('click', async () => {
        activeChallenge.stop?.()
        activeChallenge = await loadChallenge(challengeIds[challengeIndex])
        activeChallenge.run()
    })
}

main()