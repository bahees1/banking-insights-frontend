type StatWidgetProps = {
    title: string;
    amount: number;
};

export default function SingleStat({
    title,
    amount,
}: StatWidgetProps) {
    return (
        <div className="flex min-h-[140px] w-full min-w-0 flex-col justify-between rounded-2xl bg-white px-6 py-5 shadow-sm">
            <h6 className="!text-md font-medium text-gray-700">
                {title}
            </h6>

            <h6 className="min-w-0 break-all text-end !text-2xl font-semibold text-black">
                {formatCurrency(amount)}
            </h6>
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