const initaliseChallanges = () =>
    [
        [1, 'Starfield'],
    ].reduce(
        (accumulator, currentValue) => (
            currentValue.forEach((element, index) => accumulator[index].push(element)),
            accumulator
        ),
        [[], []]
    )

const initialiseDev = () => {
    const number = document.getElementById('number')
    const name = document.getElementById('name')
    return (id, challange) => {
        number.textContent = id
        name.textContent = challange
    }
}

const loadChallange = index => {
     import(`./CC/${index}.js`)
        .then(({default: main}) => main())
        .catch(error => console.error(error.message))
}

const main = () => {
    const [challangeIds, challangeNames] = initaliseChallanges()
    let challangeIndex = 0

    const setChallange = initialiseDev()
    setChallange(challangeIds[challangeIndex], challangeNames[challangeIndex])

    document.getElementById('previous').addEventListener('click', () => {
        if (--challangeIndex < 0) challangeIndex = challangeIds.length - 1
        setChallange(challangeIds[challangeIndex], challangeNames[challangeIndex])
    })
    
    document.getElementById('next').addEventListener('click', () => {
        if (++challangeIndex >= challangeIds.length) challangeIndex = 0
        setChallange(challangeIds[challangeIndex], challangeNames[challangeIndex])
    })

    document.getElementById('load').addEventListener('click', () => {
        loadChallange(challangeIds[challangeIndex])
    })
}

main()