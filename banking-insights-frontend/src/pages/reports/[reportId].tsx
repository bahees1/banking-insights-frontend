import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";

import { getReportSummary, getTransactionsForReport, getInsightsForReport } from "@/pages/api/reports";
import { ReportSummary } from "@/types/reportSummary";
import { Transaction } from "@/types/transaction";
import FileSidebar from "@/components/FileSidebar";
import TransactionTable from "@/components/TransactionTable";
import TabSwitcher, { DashboardTab } from "@/components/TabSwitcher";
import TransactionDashboard from "@/components/TransactionDashboard";
import { Insight } from "@/types/insight";
import InsightDashboard from "@/components/InsightDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import EditReportNameModal from "@/components/modals/EditReportNameModal";
import { updateReportName } from "@/pages/api/reports";


export default function ReportDashboardPage() {
    const router = useRouter();
    const { reportId } = router.query;
    const { getToken } = useAuth();

    const [reportSummary, setReportSummary] = useState<ReportSummary | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedFileName, setSelectedFileName] = useState<string>("ALL");
    const [insights, setInsights] = useState<Insight[]>([]);
    
    const [activeTab, setActiveTab] = useState<DashboardTab>("transactions");

    const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);
    const [isSavingReportName, setIsSavingReportName] = useState<boolean>(false);

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

                const token = await getToken();

                const [summary, transactionsFromApi, insightsFromApi] = await Promise.all([
                    getReportSummary(reportId, { token }),
                    getTransactionsForReport(reportId, { token }),
                    getInsightsForReport(reportId, { token }),
                ]);

                setReportSummary(summary);
                setTransactions(transactionsFromApi);
                setInsights(insightsFromApi);
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMessage(
                        "This report could not be found or you do not have permission to view it."
                    );
                } else {
                    setErrorMessage(
                        "An unexpected error occurred while loading the report."
                    );
                }
            } finally {
                setIsLoading(false);
            }
        }

        loadReportData();
    }, [router.isReady, reportId]);

    async function handleReportNameSave(newReportName: string) {
        if (!reportSummary) {
            return;
        }

        try {
            setIsSavingReportName(true);

            const token = await getToken();

            const updatedReport = await updateReportName(
                reportSummary.reportId,
                newReportName,
                { token }
            );

            setReportSummary(updatedReport);

            setEditModalIsOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSavingReportName(false);
        }
    }

    

    return (
        <main className="min-h-screen min-w-[320px]">
            <section className="mx-auto w-full max-w-7xl px-6 pt-35 sm:px-6 md:pt-32 lg:px-8 xl:px-10">
                {isLoading && (
                    <p className="text-sm text-gray-600">
                        Loading report...
                    </p>
                )}

                {errorMessage && (
                    <p className="text-center text-sm text-red-600">
                        {errorMessage}
                    </p>
                )}

                {!isLoading && !errorMessage && reportSummary && (
                    <div className="flex flex-col gap-6 md:gap-10">
                        <div className="flex flex-col md:flex-row gap-6 justify-between">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-2 ">
                                    <h5 className=" font-semibold text-black">
                                        {reportSummary.fileName}
                                    </h5>

                                    <button
                                        type="button"
                                        onClick={() => setEditModalIsOpen(true)}
                                        className=" text-gray-500 transition-colors  hover:bg-gray-100 hover:text-blue-500"
                                    >
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                </div>

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
            <EditReportNameModal
                isOpen={editModalIsOpen}
                currentReportName={reportSummary?.fileName ?? ""}
                isSaving={isSavingReportName}
                onClose={() => setEditModalIsOpen(false)}
                onSave={handleReportNameSave}
            />
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

