import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import { CategoryBreakdownItem } from "@/utils/categoryBreakdown";

type CategoryBreakdownWidgetProps = {
    data: CategoryBreakdownItem[];
};

const CHART_COLORS = [
    "#026E51",
    "#69C561",
    "#EE3642",
    "#F59E0B",
    "#3B82F6",
    "#8B5CF6",
    "#14B8A6",
];

export default function CategoryBreakdownWidget({
    data,
}: CategoryBreakdownWidgetProps) {
    return (
        <div className="flex min-h-[340px] w-full flex-col gap-4 rounded-2xl bg-white px-6 py-5 shadow-sm">
            <div className="flex flex-col gap-1">
                <h6 className="!text-md font-medium text-gray-700">
                    Spending Breakdown
                </h6>

                <p className="!text-sm text-gray-500">
                    Spending by category
                </p>
            </div>

            {data.length === 0 ? (
                <div className="flex flex-1 items-center justify-center">
                    <p className="text-sm text-gray-500">
                        No spending categories found.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="h-[220px] w-full md:w-1/2">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    dataKey="amount"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={90}
                                    paddingAngle={2}
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={entry.category}
                                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                                        />
                                    ))}
                                </Pie>

                                <Tooltip
                                    formatter={(value) => formatCurrency(Number(value))}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex w-full flex-col gap-3 md:w-1/2">
                        {data.map((item, index) => (
                            <div
                                key={item.category}
                                className="flex items-center justify-between gap-4"
                            >
                                <div className="flex min-w-0 items-center gap-2">
                                    <div
                                        className="h-3 w-3 shrink-0 rounded-full"
                                        style={{
                                            backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
                                        }}
                                    />

                                    <p className="truncate text-sm text-gray-700">
                                        {formatCategoryLabel(item.category)}
                                    </p>
                                </div>

                                <p className="shrink-0 text-sm font-medium text-black">
                                    {formatCurrency(item.amount)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
        maximumFractionDigits: 0,
    }).format(value);
}

function formatCategoryLabel(category: string): string {
    return category
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}