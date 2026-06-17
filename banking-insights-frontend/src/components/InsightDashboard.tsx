import { Insight } from "@/types/insight";
import { Transaction } from "@/types/transaction";
import TopInsights from "@/components/TopInsights";
import TransactionTable from "@/components/TransactionTable";

type InsightDashboardProps = {
    insights: Insight[];
    transactions: Transaction[];
};

export default function InsightDashboard({
    insights,
    transactions,
}: InsightDashboardProps) {
    return (
        <div className="flex flex-col gap-6">
            <TopInsights insights={insights} />

            <TransactionTable transactions={transactions} />
        </div>
    );
}