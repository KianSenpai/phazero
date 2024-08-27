interface CardProps {
    code: string
}

export default function Card({ code }: CardProps) {
    return (
        <div className="h-40 w-24 rounded border border-slate-200 p-4">
            {code}
        </div>
    )
}
