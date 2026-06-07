import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Navbar from "@/components/Navbar";
import ReportCard from "@/components/ReportCard";
import CreateReportModal from "@/components/CreateReportModal";
import { getReports } from "@/lib/api";
import { ReportListItem } from "@/types/report";

export default function ReportsPage() {
    const [createModalIsOpen, setCreateModalIsOpen] = useState<boolean>(false);
    const [reports, setReports] = useState<ReportListItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        async function loadReports() {
            try {
                setIsLoading(true);
                setErrorMessage("");

                const reportsFromApi = await getReports();

                setReports(reportsFromApi);
            } catch (error) {
                setErrorMessage("Unable to load reports. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }

        loadReports();
    }, []);

    return (
        <main className="min-h-screen">
            <Navbar />

            <section className="px-6 pt-44 md:px-24 md:pt-32">
                <div className="flex items-center justify-between pb-8">
                    <h3 className="text-lg font-medium text-black">
                        Reports
                    </h3>

                    <button
                        type="button"
                        onClick={() => setCreateModalIsOpen(true)}
                        className="flex items-center gap-2 rounded-md bg-blue-500 active:bg-blue-700 px-5 py-3 text-sm text-white"
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
                    <div className="bg-white px-6 py-8">
                        <p className="text-sm text-gray-700">
                            No reports yet. Create your first report to get started.
                        </p>
                    </div>
                )}

                {!isLoading && !errorMessage && reports.length > 0 && (
                    <div className="flex flex-col gap-4">
                        {reports.map((report) => (
                            <ReportCard
                                key={report.reportId}
                                reportName={report.fileName}
                                dateCreated={formatReportDate(report.createdAt)}
                                fileCount={report.uploadedFileCount}
                            />
                        ))}
                    </div>
                )}
            </section>

            <CreateReportModal
                isOpen={createModalIsOpen}
                onClose={() => setCreateModalIsOpen(false)}
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

