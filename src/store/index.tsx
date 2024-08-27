import { atom } from 'jotai'

const generateCards = () => {
    const cards = []
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 13; j++) {
            cards.push(`${i}-${j}`)
        }
    }
    return cards
}

export const initialDeckAtom = atom<string[]>(generateCards)
