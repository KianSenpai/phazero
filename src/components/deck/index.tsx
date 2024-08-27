import { useState } from 'react'
import Card from '../../components/card'

const generateCards = () => {
    const cards = []
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 13; j++) {
            cards.push(`${i}-${j}`)
        }
    }
    return cards
}

const shuffle = (array: string[]) => {
    const shuffledArray = [...array]
    let currentIndex = array.length

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        const randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
        ;[shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
            shuffledArray[randomIndex],
            shuffledArray[currentIndex],
        ]
    }
    return shuffledArray
}

export default function Deck() {
    const initialDeck = generateCards()
    const [deck, setDeck] = useState<string[]>(initialDeck)
    const [topCards, setTopCards] = useState<string[] | undefined>(undefined)
    const [isShuffled, setIsShuffled] = useState<boolean>(false)

    const shuffleDeck = () => {
        const newDeck = shuffle(deck)
        setDeck(newDeck)
        const cards = newDeck.slice(0, 5)
        setTopCards(cards)
        setIsShuffled(true)
    }

    const returnOriginalDeck = () => {
        setDeck(initialDeck)
        setIsShuffled(false)
    }

    return (
        <div className="flex flex-col items-center gap-6 border border-slate-200 p-4">
            <div
                className={`${isShuffled ? 'flex' : 'hidden'} justify-center gap-2 border-b border-slate-300 pb-6`}
            >
                {isShuffled && topCards?.map((card) => <Card code={card} />)}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
                {deck.map((card, index) => (
                    <div
                        className={isShuffled && index < 5 ? 'hidden' : 'block'}
                    >
                        <Card code={card} />
                    </div>
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
                    disabled={!isShuffled}
                    onClick={returnOriginalDeck}
                    className="rounded border border-slate-300 bg-slate-100 px-2 py-1"
                >
                    Original Deck
                </button>
            </div>
        </div>
    )
}
