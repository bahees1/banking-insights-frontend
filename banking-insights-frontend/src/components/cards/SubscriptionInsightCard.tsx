import InsightStatCard from "@/components/cards/InsightStatCard";

type SubscriptionInsightCardProps = {
    merchant: string;
    averageAmount: number;
};

export default function SubscriptionInsightCard({
    merchant,
    averageAmount,
}: SubscriptionInsightCardProps) {
    return (
        <InsightStatCard
            title="Subscriptions"
            label={formatMerchantName(merchant)}
            value={formatCurrency(averageAmount)}
        />
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