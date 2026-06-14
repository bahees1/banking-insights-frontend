type StatWidgetProps = {
    title: string;
    amount: number;
};

import AnimatedCurrency from "@/components/AnimatedCurrency";

export default function SingleStat({
    title,
    amount,
}: StatWidgetProps) {
    return (
        <div className="flex min-h-[140px] w-full min-w-[240px] flex-col justify-between rounded-2xl bg-white px-6 py-5 shadow-sm">
            <h6 className="!text-md font-medium text-gray-700">
                {title}
            </h6>

            <div className="min-w-0 break-all text-3xl text-end font-semibold text-black">
                <AnimatedCurrency value={amount} />
            </div>
        </div>
    );
}

