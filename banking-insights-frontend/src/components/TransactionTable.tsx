import { useEffect, useState } from "react";

import { Transaction } from "@/types/transaction";

type TransactionTableProps = {
    transactions: Transaction[];
};

const ROWS_PER_PAGE = 20;

export default function TransactionTable({
    transactions,
}: TransactionTableProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const totalPages = Math.max(
        1,
        Math.ceil(transactions.length / ROWS_PER_PAGE)
    );

    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;

    const visibleTransactions = transactions.slice(startIndex, endIndex);

    useEffect(() => {
        setCurrentPage(1);
    }, [transactions]);

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
                            <th className="px-6 py-3 text-left text-sm md:text-md font-medium text-black-500">
                                Date
                            </th>

                            <th className="px-6 py-3 text-left text-sm md:text-md font-medium text-black-500">
                                Merchant
                            </th>

                            <th className="px-6 py-3 text-right text-sm font-medium text-black-500">
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

                        {visibleTransactions.map((transaction) => (
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

            {transactions.length > 0 && (
                <div className="flex flex-col gap-3 border-t border-gray-200 px-6 py-4 md:flex-row md:items-center md:justify-between">
                    <p className="!text-sm font-semibold text-center text-gray-600">
                        Showing {startIndex + 1}-{Math.min(endIndex, transactions.length)} of {transactions.length}
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <button
                            type="button"
                            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                            disabled={currentPage === 1}
                            className="rounded-md bg-gray-100 px-4 py-2 text-sm text-black transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-100"
                        >
                            Previous
                        </button>

                        <p className="!text-sm font-semibold text-gray-600">
                            Page {currentPage} of {totalPages}
                        </p>

                        <button
                            type="button"
                            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                            disabled={currentPage === totalPages}
                            className="rounded-md bg-gray-100 px-4 py-2 text-sm text-black transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-100"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
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