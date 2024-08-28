import { useEffect, useState } from 'react'
import Card from '../../components/card'
import { shuffleFunction } from '../../utils'

interface DeckProps {
    initialDeck: string[]
    isShuffled: boolean | undefined
    id: string
}

export default function Deck({ initialDeck, isShuffled, id }: DeckProps) {
    const [deck, setDeck] = useState<string[]>(initialDeck)
    const [topCards, setTopCards] = useState<string[]>([])
    const [intervalId, setIntervalId] = useState<number | null>(null)

    const shuffleDeck = () => {
        const shuffledDeck = shuffleFunction(deck)
        setDeck(shuffledDeck)
        setTopCards(shuffledDeck.slice(0, 5))
        localStorage.setItem(`${id}`, JSON.stringify(shuffledDeck))
    }

    const returnOriginalDeck = () => {
        setDeck(initialDeck)
        setTopCards([])
        localStorage.setItem(`${id}`, [])
    }

    const autoShuffle = () => {
        if (!intervalId) {
            shuffleDeck()
            const id = setInterval(() => {
                shuffleDeck()
            }, 3000)

            setIntervalId(id)
        } else {
            clearInterval(intervalId)
            setIntervalId(null)
        }
    }

    useEffect(() => {
        return () => {
            if (intervalId) {
                clearInterval(intervalId)
            }
        }
    }, [intervalId])

    useEffect(() => {
        const oldDeck = localStorage.getItem(`${id}`)

        if (oldDeck && oldDeck.length) {
            setDeck(JSON.parse(oldDeck))
            setTopCards(JSON.parse(oldDeck).slice(0, 5))
        }
    }, [])

    useEffect(() => {
        if (isShuffled !== undefined) {
            shuffleDeck()
        }
    }, [isShuffled])

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
                    onClick={autoShuffle}
                    className="rounded border border-slate-300 bg-slate-100 px-2 py-1"
                >
                    {intervalId ? 'STOP' : 'Shuffle and Draw every 5 seconds!'}
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
