import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

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
        <div className="min-w-[320px] flex flex-row justify-between gap-4 bg-white px-6 py-4 rounded-md md:flex-row md:items-center">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-12">
                <p className="text-sm text-black font-medium line-clamp-1">
                    {reportName}
                </p>

                <p className="text-sm text-gray-700">
                    {dateCreated}
                </p>

                <p className="text-sm text-gray-700">
                    {fileCount} files
                </p>
            </div>

            <div className="flex items-center gap-6">
                <button className="text-md text-black hover:text-gray-600 transition-colors">
                    <FontAwesomeIcon icon={faEdit} />
                </button>

                <button className="text-md text-black hover:text-red-600 transition-colors">
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
}