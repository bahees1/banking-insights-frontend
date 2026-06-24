import InsightStatCard from "@/components/cards/InsightStatCard";

type MostSpentMerchantCardProps = {
    merchant: string;
    totalAmount: number;
};

export default function MostSpentMerchantCard({
    merchant,
    totalAmount,
}: MostSpentMerchantCardProps) {
    return (
        <InsightStatCard
            title="Most Spent Merchant"
            label={formatMerchantName(merchant)}
            value={formatCurrency(totalAmount)}
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