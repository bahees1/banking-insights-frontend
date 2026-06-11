import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getReportSummary, getTransactionsForReport } from "@/pages/api/reports";
import { ReportSummary } from "@/types/reportSummary";
import { Transaction } from "@/types/transaction";
import FileSidebar from "@/components/FileSidebar";
import SingleStat from "@/components/SingleStat";
import { calculateTransactionStats } from "@/utils/transactionStats";
import TransactionTable from "@/components/TransactionTable";
import CategoryBreakdownWidget from "@/components/CategoryBreakdownWidget";
import { calculateCategoryBreakdown } from "@/utils/categoryBreakdown";

export default function ReportDashboardPage() {
    const router = useRouter();
    const { reportId } = router.query;

    const [reportSummary, setReportSummary] = useState<ReportSummary | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedFileName, setSelectedFileName] = useState<string>("ALL");

    const filteredTransactions =
        selectedFileName === "ALL"
            ? transactions
            : transactions.filter((transaction) => {
                return transaction.sourceFileName === selectedFileName;
            });

    const filteredStats = calculateTransactionStats(filteredTransactions);

    const categoryBreakdown = calculateCategoryBreakdown(filteredTransactions);

    useEffect(() => {
        if (!router.isReady || typeof reportId !== "string") {
            return;
        }

        async function loadReportData() {
            try {
                setIsLoading(true);
                setErrorMessage("");

                const [summary, transactionsFromApi] = await Promise.all([
                    getReportSummary(reportId),
                    getTransactionsForReport(reportId),
                ]);

                setReportSummary(summary);
                setTransactions(transactionsFromApi);
            } catch (error) {
                setErrorMessage("Unable to load report data.");
            } finally {
                setIsLoading(false);
            }
        }

        loadReportData();
    }, [router.isReady, reportId]);

    return (
        <main className="min-h-screen min-w-[320px]">
            <section className="px-6 pt-44 md:px-24 md:pt-32">
                {isLoading && (
                    <p className="text-sm text-gray-600">
                        Loading report...
                    </p>
                )}

                {errorMessage && (
                    <p className="text-sm text-red-600">
                        {errorMessage}
                    </p>
                )}

                {!isLoading && !errorMessage && reportSummary && (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h5 className="text-2xl font-semibold text-black">
                                {reportSummary.fileName}
                            </h5>

                            <div className="flex flex-row gap-2 text-md text-gray-700">
                                <div>
                                    {formatReportDate(reportSummary.createdAt)}
                                </div>
                                •
                                <div>
                                    {reportSummary.uploadedFiles.length} Files
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 md:flex-row">
                            <FileSidebar
                                uploadedFiles={reportSummary.uploadedFiles}
                                selectedFileName={selectedFileName}
                                onSelectFile={setSelectedFileName}
                            />

                            <div className="w-full flex flex-col gap-6 ">
                                <div className="flex w-full flex-col gap-6 md:flex-row">
                                    <div className="flex flex-col gap-6">
                                        <SingleStat title="Income" amount={filteredStats.totalIncome} />
                                        <SingleStat title="Expenses" amount={filteredStats.totalExpenses} />
                                        <SingleStat title="Cash Flow" amount={filteredStats.netCashFlow} />
                                    </div>
                                    <CategoryBreakdownWidget data={categoryBreakdown} />
                                </div>
                                
                                
                                <TransactionTable transactions={filteredTransactions} />
                                


                            </div>
                            
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}

function formatReportDate(dateValue: string): string {
    return new Date(dateValue).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}