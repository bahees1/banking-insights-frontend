import AnimatedCurrency from "@/components/AnimatedCurrency";

type TopInsightCardProps = {
    title: string;
    label: string;
    value: string;
    amount?: number;
};

export default function TopInsightCard({
    title,
    label,
    value,
    amount,
}: TopInsightCardProps) {
    return (
        <div className="flex min-h-[120px] w-full flex-col justify-between gap-4 rounded-xl bg-white px-5 py-5 shadow-md lg:flex-1">
            <p className="!font-semibold text-black">
                {title}
            </p>

            <div className="flex flex-col">
                <div className="text-end font-semibold text-black md:!text-2xl">
                    {amount !== undefined ? (
                        <AnimatedCurrency value={amount} />
                    ) : (
                        value
                    )}
                </div>

                <p className="!text-md line-clamp-1 text-end text-gray-600">
                    {label}
                </p>
            </div>
        </div>
    );
}