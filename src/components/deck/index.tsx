import { useMemo, useState } from 'react'
import Card from '../../components/card'

const generateCards = (): string[] => {
    const cards = []
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 13; j++) {
            cards.push(`${i}-${j}`)
        }
    }
    return cards
}

const shuffle = (array: string[]): string[] => {
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

export default function Deck() {
    const initialDeck = useMemo(generateCards, [])
    const [deck, setDeck] = useState<string[]>(initialDeck)
    const [topCards, setTopCards] = useState<string[]>([])

    const shuffleDeck = () => {
        const shuffledDeck = shuffle(deck)
        setDeck(shuffledDeck)
        setTopCards(shuffledDeck.slice(0, 5))
    }

    const returnOriginalDeck = () => {
        setDeck(initialDeck)
        setTopCards([])
    }

    return (
        <div className="flex flex-col items-center gap-6 border border-slate-200 p-4">
            {topCards.length > 0 && (
                <div className="flex justify-center gap-2 border-b border-slate-300 pb-6">
                    {topCards.map((card, index) => (
                        <Card key={`top-${index}`} code={card} />
                    ))}
                </div>
            )}
            <div className="flex flex-wrap justify-center gap-2">
                {deck.slice(topCards.length).map((card, index) => (
                    <Card key={`deck-${index}`} code={card} />
                ))}
            </div>

            <div className="flex w-fit gap-4">
                <button
                    onClick={shuffleDeck}
                    className="rounded border border-slate-300 bg-slate-100 px-2 py-1"
                >
                    Shuffle and Draw!
                </button>
                <button
                    disabled={topCards.length === 0}
                    onClick={returnOriginalDeck}
                    className="rounded border border-slate-300 bg-slate-100 px-2 py-1"
                >
                    Original Deck
                </button>
            </div>
        </div>
    )
}
