import {
    calculatePercentageChange,
    formatCategory,
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
    categories: CategoryChangeItem[];
    trendType: "increase" | "decrease";
};

export default function TrendChangeCard({
    title,
    categories,
    trendType,
}: TrendChangeCardProps) {
    return (
        <div className="flex min-h-[150px] w-full flex-col gap-4 rounded-xl bg-white px-5 py-5 shadow-sm lg:flex-1">
            <p className="!font-semibold text-black">
                {title}
            </p>

            <div className="flex flex-col gap-3">
                {categories.map((item) => (
                    <div
                        key={item.category}
                        className="flex items-center justify-between gap-4"
                    >
                        <p className="text-sm text-black">
                            {formatCategory(item.category)}
                        </p>

                        <p
                            className={
                                trendType === "increase"
                                    ? "text-sm font-semibold text-green-600"
                                    : "text-sm font-semibold text-red-600"
                            }
                        >
                            {trendType === "increase" ? "+" : "-"}
                            {calculatePercentageChange(
                                item.previousAmount,
                                item.latestAmount
                            )}
                            %
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}