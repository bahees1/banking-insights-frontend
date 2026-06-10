import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getReportSummary, getTransactionsForReport } from "@/pages/api/reports";
import { ReportSummary } from "@/types/reportSummary";
import { Transaction } from "@/types/transaction";
import FileSidebar from "@/components/FileSidebar";
import SingleStat from "@/components/SingleStat";

export default function ReportDashboardPage() {
    const router = useRouter();
    const { reportId } = router.query;

    const [reportSummary, setReportSummary] = useState<ReportSummary | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [transactions, setTransactions] = useState<Transaction[]>([]);

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
                                <div>
                                    {transactions.length} Transactions Loaded
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 md:flex-row">
                            <FileSidebar uploadedFiles={reportSummary.uploadedFiles} />

                            <div className="w-full flex flex-col gap-6 ">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <SingleStat title="Total Income" amount={reportSummary.totalIncome} />
                                    <SingleStat title="Total Expenses" amount={reportSummary.totalExpenses} />
                                    <SingleStat title="Net Cash Flow" amount={reportSummary.netCashFlow} />
                                </div>
                                <section className="min-h-[400px] flex-1 rounded-xl bg-white p-6 shadow-sm">
                                    <p className="text-sm text-gray-500">
                                        Transaction table will go here.
                                    </p>
                                </section>


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