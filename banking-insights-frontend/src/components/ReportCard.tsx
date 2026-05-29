type ReportCardProps = {
    reportName: string;
    dateCreated: string;
    fileCount: number;
};

export default function ReportCard({
    reportName,
    dateCreated,
    fileCount,
}: ReportCardProps) {
    return (
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-sm">
            <div className="flex items-center gap-12">
                <p className="text-sm text-black">
                    {reportName}
                </p>

                <p className="text-sm text-black">
                    {dateCreated}
                </p>

                <p className="text-sm text-black">
                    {fileCount} files
                </p>
            </div>

            <div className="flex items-center gap-8">
                <button className="text-sm text-black">
                    Edit button
                </button>

                <button className="text-sm text-black">
                    Delete Button
                </button>
            </div>
        </div>
    );
}