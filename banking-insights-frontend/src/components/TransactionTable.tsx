import { Transaction } from "@/types/transaction";

type TransactionTableProps = {
    transactions: Transaction[];
};

export default function TransactionTable({
    transactions,
}: TransactionTableProps) {
    return (
        <div className="w-full overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="flex items-center justify-between px-6 py-5">
                <h6 className="!text-md font-medium text-gray-700">
                    Transactions
                </h6>

                <p className="!text-sm md:!text-md !text-blue-500 font-medium">
                    {transactions.length} transactions
                </p>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[600px]">
                    <thead>
                        <tr className="border-y border-gray-300">
                            <th className="px-6 py-3 text-left text-xs font-medium text-black-500">
                                Date
                            </th>

                            <th className="px-6 py-3 text-left text-xs font-medium text-black-500">
                                Merchant
                            </th>

                            <th className="px-6 py-3 text-right text-xs font-medium text-black-500">
                                Price
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.length === 0 && (
                            <tr>
                                <td
                                    colSpan={3}
                                    className="px-6 py-8 text-center text-sm text-gray-500"
                                >
                                    No transactions found for this selection.
                                </td>
                            </tr>
                        )}

                        {transactions.map((transaction) => (
                            <tr
                                key={transaction.transactionId}
                                className="border-b border-gray-200"
                            >
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {formatDate(transaction.transactionDate)}
                                </td>

                                <td className="px-6 py-4 text-sm font-medium text-black-500">
                                    {getMerchantName(transaction)}
                                </td>

                                <td className="px-6 py-4 text-right text-sm font-medium text-black">
                                    {formatCurrency(transaction.amount)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function getMerchantName(transaction: Transaction): string {
    if (transaction.normalizedMerchant && transaction.normalizedMerchant.trim() !== "") {
        return transaction.normalizedMerchant;
    }

    return transaction.rawDescription;
}

function formatDate(dateValue: string): string {
    return new Date(dateValue).toLocaleDateString("en-CA", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
    }).format(value);
}