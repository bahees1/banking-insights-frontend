import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getReportSummary, getTransactionsForReport, getInsightsForReport } from "@/pages/api/reports";
import { ReportSummary } from "@/types/reportSummary";
import { Transaction } from "@/types/transaction";
import FileSidebar from "@/components/FileSidebar";
import TransactionTable from "@/components/TransactionTable";
import TabSwitcher, { DashboardTab } from "@/components/TabSwitcher";
import TransactionDashboard from "@/components/TransactionDashboard";
import { Insight } from "@/types/insight";
import InsightDashboard from "@/components/InsightDashboard";


export default function ReportDashboardPage() {
    const router = useRouter();
    const { reportId } = router.query;

    const [reportSummary, setReportSummary] = useState<ReportSummary | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedFileName, setSelectedFileName] = useState<string>("ALL");
    const [insights, setInsights] = useState<Insight[]>([]);
    
    const [activeTab, setActiveTab] = useState<DashboardTab>("transactions");

    const filteredTransactions =
        selectedFileName === "ALL"
            ? transactions
            : transactions.filter((transaction) => {
                return transaction.sourceFileName === selectedFileName;
            });

    useEffect(() => {
        if (!router.isReady || typeof reportId !== "string") {
            return;
        }

        async function loadReportData() {
            try {
                setIsLoading(true);
                setErrorMessage("");

                const [summary, transactionsFromApi, insightsFromApi] = await Promise.all([
                    getReportSummary(reportId),
                    getTransactionsForReport(reportId),
                    getInsightsForReport(reportId),
                ]);

                setReportSummary(summary);
                setTransactions(transactionsFromApi);
                setInsights(insightsFromApi);
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
            <section className="px-6 pt-44 md:px-34 md:pt-32">
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
                        <div className="flex flex-col md:flex-row gap-2 justify-between">
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
                            <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
                            
                        </div>

                        <div className="flex flex-col gap-6 md:flex-row">
                            <FileSidebar
                                uploadedFiles={reportSummary.uploadedFiles}
                                selectedFileName={selectedFileName}
                                onSelectFile={setSelectedFileName}
                            />

                            <div className="w-full min-w-0 flex flex-col gap-6 ">
                                {activeTab === "transactions" && (
                                    <div className="flex flex-col gap-6">
                                        <TransactionDashboard transactions={filteredTransactions} />
                                        <TransactionTable transactions={filteredTransactions} />
                                    </div>
                                )}

                                {activeTab === "insights" && (
                                    <div className="flex flex-col gap-6">
                                        <InsightDashboard insights={insights} />
                                        <TransactionTable transactions={filteredTransactions} />
                                    </div>
                                )}
                            
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