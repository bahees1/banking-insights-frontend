import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Navbar from "@/components/Navbar";
import ReportCard from "@/components/ReportCard";
import CreateReportModal from "@/components/CreateReportModal";

const reports = [
    {
        reportName: "March Spending ReportReportReportReportReportReportReport",
        dateCreated: "Apr 29, 2026",
        fileCount: 3,
    },
    {
        reportName: "AMEX + RBC Report",
        dateCreated: "Apr 20, 2026",
        fileCount: 2,
    },
];

export default function ReportsPage() {
    const [createModalIsOpen, setCreateModalIsOpen] = useState<boolean>(false);

    return (
        <main className="min-h-screen min-w-[320px]">
            <Navbar />

            <section className="px-6 pt-44 md:px-24 md:pt-32">
                <div className="flex items-center justify-between pb-8">
                    <h4 className="text-lg font-medium text-black">
                        Reports
                    </h4>

                    <button
                        type="button"
                        onClick={() => setCreateModalIsOpen(true)}
                        className="flex items-center gap-2 bg-blue-500 px-5 py-3 text-sm text-white rounded-md"
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        Create
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    {reports.map((report) => (
                        <ReportCard
                            key={report.reportName}
                            reportName={report.reportName}
                            dateCreated={report.dateCreated}
                            fileCount={report.fileCount}
                        />
                    ))}
                </div>
            </section>

            <CreateReportModal
                isOpen={createModalIsOpen}
                onClose={() => setCreateModalIsOpen(false)}
            />
        </main>
    );
}