import { Transaction } from "@/types/transaction";

export type TransactionStats = {
    totalIncome: number;
    totalExpenses: number;
    netCashFlow: number;
    averageDailySpend: number;
};

// used to grab the total income, expenses for individual files and overall report summary
export function calculateTransactionStats(
    transactions: Transaction[]
): TransactionStats {
    let totalIncome = 0;
    let totalExpenses = 0;

    const expenseDates = new Set<string>();

    for (const transaction of transactions) {
        if (transaction.cashFlowType === "INCOME") {
            totalIncome += Math.abs(transaction.amount);
        }

        if (transaction.cashFlowType === "EXPENSE") {
            totalExpenses += Math.abs(transaction.amount);

            const transactionDate = new Date(
                transaction.transactionDate
            ).toISOString().split("T")[0];

            expenseDates.add(transactionDate);
        }
    }

    const averageDailySpend =
        expenseDates.size > 0
            ? totalExpenses / expenseDates.size
            : 0;

    return {
        totalIncome,
        totalExpenses,
        netCashFlow: totalIncome - totalExpenses,
        averageDailySpend,
    };
}