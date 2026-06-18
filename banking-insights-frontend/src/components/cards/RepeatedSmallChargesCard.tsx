import InsightStatCard from "@/components/cards/InsightStatCard";

type RepeatedSmallChargesCardProps = {
    transactionCount: number;
    totalAmount: number;
};

export default function RepeatedSmallChargesCard({
    transactionCount,
    totalAmount,
}: RepeatedSmallChargesCardProps) {
    return (
        <InsightStatCard
            title="Repeated Small Charges"
            label={`${transactionCount} transactions`}
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