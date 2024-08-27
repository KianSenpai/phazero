import ClubImage from '../../assets/club.svg'
import DiamondImage from '../../assets/diamond.svg'
import HeartImage from '../../assets/heart.svg'
import SpadeImage from '../../assets/spade.svg'

interface CardProps {
    code: string
}

const suitMap: { [key: string]: { alt: string; src: string } } = {
    '0': { alt: 'club', src: ClubImage },
    '1': { alt: 'diamond', src: DiamondImage },
    '2': { alt: 'spade', src: SpadeImage },
    '3': { alt: 'heart', src: HeartImage },
}

const getSuit = (t: string) => {
    const suit = suitMap[t]
    return suit ? <img alt={suit.alt} src={suit.src} /> : null
}

const numberMap: { [key: string]: string } = {
    '0': 'A',
    '10': 'J',
    '11': 'Q',
    '12': 'K',
}

const getNumber = (t: string): string | number | undefined => {
    return (
        numberMap[t] ??
        (Number(t) >= 1 && Number(t) <= 9 ? Number(t) + 1 : undefined)
    )
}

export default function Card({ code }: CardProps) {
    const [suitCode, numberCode] = code.split('-')

    const isRedSuit = suitCode === '1' || suitCode === '3' // for diamonds and hearts
    const suitElement = getSuit(suitCode)
    const numberElement = getNumber(numberCode)

    return (
        <div className="w-24 rounded border border-slate-200 p-4">
            <span
                className={`font-semibold ${isRedSuit ? 'text-red-600' : 'text-black'}`}
            >
                {numberElement}
            </span>
            {suitElement}
        </div>
    )
}
