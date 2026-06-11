import { Transaction } from "@/types/transaction";

export type CategoryBreakdownItem = {
    category: string;
    amount: number;
};

export function calculateCategoryBreakdown(
    transactions: Transaction[]
): CategoryBreakdownItem[] {

    const categoryTotals = new Map<string, number>();

    for (const transaction of transactions) {

        if (transaction.cashFlowType !== "EXPENSE") {
            continue;
        }

        const category = transaction.category || "Other";

        const currentAmount =
            categoryTotals.get(category) ?? 0;

        categoryTotals.set(
            category,
            currentAmount + Math.abs(transaction.amount)
        );
    }

    return Array.from(categoryTotals.entries())
        .map(([category, amount]) => ({
            category,
            amount,
        }))
        .sort((a, b) => b.amount - a.amount);
}