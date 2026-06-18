type FlexScoreCardProps = {
    score: number;
    necessitiesAmount: number;
    nonNecessitiesAmount: number;
};

export default function FlexScoreCard({
    score,
    necessitiesAmount,
    nonNecessitiesAmount,
}: FlexScoreCardProps) {
    const totalTrackedAmount = necessitiesAmount + nonNecessitiesAmount;

    const essentialsPercentage =
        totalTrackedAmount === 0
            ? 0
            : (necessitiesAmount / totalTrackedAmount) * 100;

    const discretionaryPercentage = 100 - essentialsPercentage;

    return (
        <div className="flex min-h-[120px] w-full flex-col gap-4 rounded-xl bg-white px-5 py-5 shadow-sm lg:flex-1">
            <p className="font-semibold text-black">
                Flex Score
            </p>

            <div className="flex flex-col gap-3">
                <p className="!text-2xl text-end font-semibold text-black">
                    {score}/100
                </p>

                <div className="flex h-3 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                        className="h-full bg-green-400"
                        style={{
                            width: `${essentialsPercentage}%`,
                        }}
                    />

                    <div
                        className="h-full bg-orange-400"
                        style={{
                            width: `${discretionaryPercentage}%`,
                        }}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <LegendItem
                        colorClassName="bg-green-500"
                        label="Essentials"
                        amount={necessitiesAmount}
                    />

                    <LegendItem
                        colorClassName="bg-orange-400"
                        label="Non-essentials"
                        amount={nonNecessitiesAmount}
                    />
                </div>
            </div>
        </div>
    );
}

type LegendItemProps = {
    colorClassName: string;
    label: string;
    amount: number;
};

function LegendItem({
    colorClassName,
    label,
    amount,
}: LegendItemProps) {
    return (
        <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
                <div className={`h-3 w-3 shrink-0 rounded-full ${colorClassName}`} />

                <p className="truncate !text-sm text-gray-600">
                    {label}
                </p>
            </div>

            <p className="shrink-0 !text-sm font-medium text-black">
                {formatCurrency(amount)}
            </p>
        </div>
    );
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
    }).format(value);
}