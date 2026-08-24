import {
    calculatePercentageChange,
    formatCategory,
    formatMonth,
} from "@/utils/formatters";

export type CategoryChangeItem = {
    category: string;
    previousAmount: number;
    latestAmount: number;
    difference: number;
    absoluteDifference: number;
};

type TrendChangeCardProps = {
    title: string;
    previousMonth: string;
    latestMonth: string;
    categories: CategoryChangeItem[];
    trendType: "increase" | "decrease";
};

export default function TrendChangeCard({
    title,
    previousMonth,
    latestMonth,
    categories,
    trendType,
}: TrendChangeCardProps) {
    return (
        <div className="flex min-h-[150px] w-full flex-col gap-4 rounded-xl bg-white px-5 py-5 shadow-sm lg:flex-1">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <p className="font-semibold text-black">
                    {title}
                </p>

                <div className="flex shrink-0 items-center gap-2 text-sm text-gray-500">
                    <span>{formatMonth(previousMonth)}</span>

                    <span className="text-gray-400">
                        →
                    </span>

                    <span>{formatMonth(latestMonth)}</span>
                </div>
            </div>

            {/* Category changes */}
            <div className="flex flex-col divide-y divide-gray-100">
                {categories.map((item) => (
                    <div
                        key={item.category}
                        className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                        {/* Category + percentage */}
                        <div className="flex min-w-0 items-center gap-2">
                            <p className="truncate text-gray-600">
                                {formatCategory(item.category)}
                            </p>

                            <p
                                className={
                                    trendType === "increase"
                                        ? "shrink-0 !text-sm font-semibold text-green-600"
                                        : "shrink-0 !text-sm font-semibold text-red-600"
                                }
                            >
                                (
                                {trendType === "increase" ? "+" : "-"}
                                {calculatePercentageChange(
                                    item.previousAmount,
                                    item.latestAmount
                                )}
                                %)
                            </p>
                        </div>

                        {/* Previous → latest amount */}
                        <div className="flex shrink-0 items-center gap-2 text-md">
                            <span className="text-gray-500">
                                {formatCurrency(item.previousAmount)}
                            </span>

                            <span className="text-gray-400">
                                →
                            </span>

                            <span className="font-medium text-black">
                                {formatCurrency(item.latestAmount)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
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