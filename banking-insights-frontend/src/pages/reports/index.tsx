import ReportCard from "@/components/ReportCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


const reports = [
    {
        reportName: "March Spending Report",
        dateCreated: "Apr 29, 2026",
        fileCount: 3,
    },
    {
        reportName: "AMEX + RBC Report",
        dateCreated: "Apr 20, 2026",
        fileCount: 2,
    },
    {
        reportName: "April Monthly Review",
        dateCreated: "Apr 15, 2026",
        fileCount: 4,
    },
];

export default function ReportsPage() {
    return (
        <main className="min-h-screen">
            <section className="px-8 md:px-18 lg:md-24 pt-32">
                <div className="flex items-center justify-between pb-8">
                    <h4 className="text-sm font-medium text-black">
                        Reports
                    </h4>

                    <button className="flex items-center gap-2 bg-blue-500 text-white text-sm px-4 py-3 rounded-lg">
                        Create
                        <FontAwesomeIcon icon={faPlus} />
                        
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
        </main>
    );
}