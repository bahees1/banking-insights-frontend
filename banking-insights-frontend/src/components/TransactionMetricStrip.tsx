import AnimatedCurrency from "@/components/AnimatedCurrency";

type TransactionMetricStripProps = {
    totalIncome: number;
    totalExpenses: number;
    netCashFlow: number;
    averageDailySpend: number;
};

export default function TransactionMetricStrip({
    totalIncome,
    totalExpenses,
    netCashFlow,
    averageDailySpend,
}: TransactionMetricStripProps) {
    return (
        <div className="flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm md:flex-row md:flex-wrap lg:flex-nowrap">
            {/* Income */}
            <Metric
                label="Income"
                value={totalIncome}
            />

            {/* Expenses */}
            <Metric
                label="Expenses"
                value={totalExpenses}
            />

            {/* Cash Flow */}
            <Metric
                label="Cash Flow"
                value={netCashFlow}
            />

            {/* Average Daily Spend */}
            <Metric
                label="Avg Daily Spend"
                value={averageDailySpend}
                suffix="/day"
            />
        </div>
    );
}

type MetricProps = {
    label: string;
    value: number;
    suffix?: string;
};

function Metric({
    label,
    value,
    suffix,
}: MetricProps) {
    return (
        <div
            className="
                flex
                w-full
                flex-col
                gap-3
                border-b
                border-gray-200
                px-6
                py-5

                last:border-b-0

                md:w-1/2
                md:border-b
                md:[&:nth-child(odd)]:border-r

                lg:flex-1
                lg:w-auto
                lg:border-b-0
                lg:border-r
                lg:[&:nth-child(odd)]:border-r
                lg:last:border-r-0
            "
        >
            <p className="text-sm font-medium text-gray-500">
                {label}
            </p>

            <div className="flex items-baseline justify-end gap-1 text-right text-2xl font-semibold text-black">
                <AnimatedCurrency value={value} />

                {suffix && (
                    <span className="text-sm font-medium text-gray-500">
                        {suffix}
                    </span>
                )}
            </div>
        </div>
    );
}