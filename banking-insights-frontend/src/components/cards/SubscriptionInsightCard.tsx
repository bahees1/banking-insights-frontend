type SubscriptionItem = {
    merchant: string;
    averageAmount: number;
};

type SubscriptionInsightCardProps = {
    subscriptions: SubscriptionItem[];
};

export default function SubscriptionInsightCard({
    subscriptions,
}: SubscriptionInsightCardProps) {
    return (
        <div className="flex min-h-[120px] w-full flex-col gap-4 rounded-xl bg-white px-5 py-5 shadow-sm lg:flex-1">
            <p className="font-semibold text-black">
                Subscriptions
            </p>

            <div className="flex flex-col divide-y divide-gray-100">
                {subscriptions.map((subscription) => (
                    <div
                        key={`${subscription.merchant}-${subscription.averageAmount}`}
                        className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
                    >
                        <p className="min-w-0 truncate text-sm text-gray-600">
                            {formatMerchantName(subscription.merchant)}
                        </p>

                        <p className="shrink-0 text-sm font-semibold text-black">
                            {formatCurrency(subscription.averageAmount)}
                        </p>
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

function formatMerchantName(merchant: string): string {
    return merchant
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}