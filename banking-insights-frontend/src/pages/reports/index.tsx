import ReportCard from "@/components/ReportCard";

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
            <section className="px-24 pt-32">
                <div className="flex items-center justify-between pb-8">
                    <h1 className="text-lg font-medium text-black">
                        Reports
                    </h1>

                    <button className="bg-blue-500 text-white text-sm px-5 py-3 rounded-md">
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
        </main>
    );
}