import { Transaction } from "@/types/transaction";
import CategoryBreakdownWidget from "@/components/CategoryBreakdownWidget";
import TransactionMetricStrip from "@/components/TransactionMetricStrip";
import { calculateTransactionStats } from "@/utils/transactionStats";
import { calculateCategoryBreakdown } from "@/utils/categoryBreakdown";

type TransactionDashboardProps = {
    transactions: Transaction[];
};

export default function TransactionDashboard({
    transactions,
}: TransactionDashboardProps) {
    const stats = calculateTransactionStats(transactions);
    const categoryBreakdown = calculateCategoryBreakdown(transactions);

    return (
        <div className="flex w-full flex-col gap-6">
            <TransactionMetricStrip
                totalIncome={stats.totalIncome}
                totalExpenses={stats.totalExpenses}
                netCashFlow={stats.netCashFlow}
                averageDailySpend={stats.averageDailySpend}
            />

            <CategoryBreakdownWidget
                data={categoryBreakdown}
            />
        </div>
    );
}