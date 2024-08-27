import Deck from '../../components/deck'
import { useState } from 'react'

export default function Home() {
    const [deckCount, setDeckCount] = useState(1)
    const changeDeckCount = () => {
        setDeckCount(deckCount + 1)
    }
    return (
        <>
            <div className="flex flex-col gap-4 p-8">
                {Array(deckCount)
                    .fill(null)
                    .map((_, index) => (
                        <Deck key={`deck-${index}`} />
                    ))}
            </div>
            <div className="fixed bottom-0 right-0 flex gap-4">
                <button
                    onClick={changeDeckCount}
                    className="rounded border border-slate-300 bg-slate-100 px-2 py-1"
                >
                    Add Deck
                </button>
            </div>
        </>
    )
}
