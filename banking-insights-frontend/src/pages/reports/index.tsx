import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";

import ReportCard from "@/components/ReportCard";
import CreateReportModal from "@/components/modals/CreateReportModal";
import { getReports } from "@/pages/api/reports";
import { ReportListItem } from "@/types/report";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DeleteReportModal from "@/components/modals/DeleteReportModal";
import { deleteReport } from "../api/reports";
import { useDemoMode } from "@/hooks/useDemoMode";
import DemoModeModal from "@/components/modals/DemoModeModal";

export default function ReportsPage() {
    const [createModalIsOpen, setCreateModalIsOpen] = useState<boolean>(false);
    const [reports, setReports] = useState<ReportListItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [selectedReportToDelete, setSelectedReportToDelete] = useState<{reportId: string;reportName: string;} | null>(null);
    const { isDemoUser } = useDemoMode();
    const [demoModeModalIsOpen, setDemoModeModalIsOpen] = useState<boolean>(false);
    const { getToken } = useAuth();

    const router = useRouter();
    function handleReportCardClick(reportId: string) {
        router.push(`/reports/${reportId}`);
    }

    // load all reports for the user 
    async function loadReports() {
        try {
            setIsLoading(true);
            setErrorMessage("");

            const token = await getToken();

            const reportsFromApi = await getReports({
                token,
            });

            setReports(reportsFromApi);
        } catch (error) {
            setErrorMessage("Unable to load reports. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadReports();
    }, []);

    function handleDeleteClick(reportId: string, reportName: string) {
        if (isDemoUser) {
            setDemoModeModalIsOpen(true);
            return;
        }

        setSelectedReportToDelete({
            reportId,
            reportName,
        });

        setDeleteModalIsOpen(true);
    }

    async function handleConfirmDeleteReport() {
        if (!selectedReportToDelete) {
            return;
        }

        try {
            setIsDeleting(true);
            setErrorMessage("");

            const token = await getToken();

            await deleteReport(selectedReportToDelete.reportId, {
                token,
            });

            await loadReports();

            setDeleteModalIsOpen(false);
            setSelectedReportToDelete(null);
        } catch (error) {
            setErrorMessage("Unable to delete report. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    }

    async function getAuthToken() {
        return await getToken();
    }


    return (
        <main className="min-h-screen">
            <section className="mx-auto w-full max-w-7xl px-4 pt-44 sm:px-6 md:pt-32 ">
                <div className="flex min-w-[340px] items-center justify-between pb-8">
                    <h5 className="text-lg font-semibold text-black">
                        My Reports
                    </h5>
                    

                    <button
                        type="button"
                        onClick={() => {
                            if (isDemoUser) {
                                setDemoModeModalIsOpen(true);
                                return;
                            }

                            setCreateModalIsOpen(true);
                        }}
                        className="flex items-center gap-2 rounded-md bg-blue-500 active:bg-blue-300 px-5 py-3 text-sm text-white"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Create
                    </button>
                </div>

                {isLoading && (
                    <p className="text-sm text-gray-600">
                        Loading reports...
                    </p>
                )}

                {errorMessage && (
                    <p className="text-sm text-red-600">
                        {errorMessage}
                    </p>
                )}

                {!isLoading && !errorMessage && reports.length === 0 && (
                    <div className="bg-white px-6 rounded-md py-8">
                        <p className="text-sm text-gray-700">
                            No reports yet. Create your first report to get started.
                        </p>
                    </div>
                )}

                {!isLoading && !errorMessage && reports.length > 0 && (
                    <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap">
                        {reports.map((report) => (
                            <div
                                key={report.reportId}
                                className="w-full lg:w-[calc(50%-0.5rem)] xl:w-[calc(33.333%-0.7rem)]"
                            >
                                <ReportCard
                                    reportId={report.reportId}
                                    reportName={report.fileName}
                                    dateCreated={formatReportDate(report.createdAt)}
                                    fileCount={report.uploadedFileCount}
                                    onClick={handleReportCardClick}
                                    onDeleteClick={handleDeleteClick}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <CreateReportModal
                isOpen={createModalIsOpen}
                onClose={() => setCreateModalIsOpen(false)}
                onReportCreated={loadReports}
                getAuthToken={getAuthToken}
            />

            <DeleteReportModal
                isOpen={deleteModalIsOpen}
                reportName={selectedReportToDelete?.reportName ?? "this report"}
                isDeleting={isDeleting}
                onClose={() => {
                    setDeleteModalIsOpen(false);
                    setSelectedReportToDelete(null);
                }}
                onConfirm={handleConfirmDeleteReport}
            />
            <DemoModeModal
                isOpen={demoModeModalIsOpen}
                onClose={() => setDemoModeModalIsOpen(false)}
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

