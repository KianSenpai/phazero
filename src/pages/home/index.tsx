import Deck from '../../components/deck'
import { useEffect, useMemo, useState } from 'react'
import { generateCards } from '../../utils'

export default function Home() {
    const initialDeck = useMemo(generateCards, [])

    const [deckCount, setDeckCount] = useState(1)
    const [shuffleAll, setShuffleAll] = useState<boolean | undefined>(undefined)

    const addDeckCount = () => {
        setDeckCount(deckCount + 1)
        localStorage.setItem('deck count', JSON.stringify(deckCount + 1))
    }
    const subDeckCount = () => {
        setDeckCount(deckCount - 1)
        localStorage.setItem('deck count', JSON.stringify(deckCount - 1))
    }
    const handleShuffleDeck = () => {
        setShuffleAll(!shuffleAll)
    }

    useEffect(() => {
        const oldCount = localStorage.getItem('deck count')
        if (oldCount && oldCount.length) {
            setDeckCount(JSON.parse(oldCount))
        }
    }, [])

    return (
        <>
            <div className="flex flex-col gap-4 p-8">
                {Array(deckCount)
                    .fill(null)
                    .map((_, index) => (
                        <Deck
                            key={`deck-${index}`}
                            initialDeck={initialDeck}
                            id={`deck-${index}`}
                            isShuffled={shuffleAll}
                        />
                    ))}
            </div>
            <div className="fixed bottom-0 right-0 flex gap-4">
                <button
                    onClick={addDeckCount}
                    className="rounded border border-slate-300 bg-slate-100 px-2 py-1"
                >
                    Add Deck
                </button>
                <button
                    onClick={subDeckCount}
                    disabled={deckCount === 0}
                    className="rounded border border-slate-300 bg-slate-100 px-2 py-1"
                >
                    Subtract Deck
                </button>
                <button
                    onClick={handleShuffleDeck}
                    className="rounded border border-slate-300 bg-slate-100 px-2 py-1"
                >
                    Shuffle All
                </button>
            </div>
        </>
    )
}
