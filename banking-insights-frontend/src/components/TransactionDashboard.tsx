import { Transaction } from "@/types/transaction";
import SingleStat from "@/components/SingleStat";
import CategoryBreakdownWidget from "@/components/CategoryBreakdownWidget";
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
        <div className="flex w-full flex-col gap-6 lg:flex-row">
            <div className="flex w-full min-w-0 flex-col gap-6">
                <SingleStat title="Income" amount={stats.totalIncome} />
                <SingleStat title="Expenses" amount={stats.totalExpenses} />
                <SingleStat title="Cash Flow" amount={stats.netCashFlow} />
            </div>

            <CategoryBreakdownWidget data={categoryBreakdown} />
        </div>
    );
}