export const generateCards = (): string[] => {
    const cards = []
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 13; j++) {
            cards.push(`${i}-${j}`)
        }
    }
    return cards
}

export const shuffleFunction = (array: string[]): string[] => {
    const shuffledArray = array.slice()
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))
        ;[shuffledArray[i], shuffledArray[randomIndex]] = [
            shuffledArray[randomIndex],
            shuffledArray[i],
        ]
    }
    return shuffledArray
}

export const compareArrays = (a: any[], b: any[]) => {
    if (a && b) {
        return (
            a.length === b.length &&
            a.every((element: any, index: number) => element === b[index])
        )
    }
    return undefined
}
