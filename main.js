const initaliseChallenges = () =>
    [
        [1, 'Starfield'],
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
        const {run, stop} = await import(`./CC/${index}.js`)
        return {run, stop}
     } catch (error) {
        console.error(error)
     }
}

const main = () => {
    const [challengeIds, challengeNames] = initaliseChallenges()
    let challengeIndex = 0
    let activeChallenge = {}

    const setChallengeDisplay = initialiseDisplay()
    setChallengeDisplay(challengeIds[challengeIndex], challengeNames[challengeIndex])

    document.getElementById('previous').addEventListener('click', () => {
        if (--challengeIndex < 0) challengeIndex = challengeIds.length - 1
        setChallengeDisplay(challengeIds[challengeIndex], challengeNames[challengeIndex])
    })
    
    document.getElementById('next').addEventListener('click', () => {
        if (++challengeIndex >= challengeIds.length) challengeIndex = 0
        setChallengeDisplay(challengeIds[challengeIndex], challengeNames[challengeIndex])
    })

    document.getElementById('load').addEventListener('click', async () => {
        if (activeChallenge.stop != undefined) activeChallenge.stop()
        activeChallenge = await loadChallenge(challengeIds[challengeIndex])
        activeChallenge.run()
    })
}

main()