import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

type ReportCardProps = {
    reportId: string;
    reportName: string;
    dateCreated: string;
    fileCount: number;
    onClick: (reportId: string) => void;
};

export default function ReportCard({
    reportId,
    reportName,
    dateCreated,
    fileCount,
    onClick,
}: ReportCardProps) {
    return (
        <div
            onClick={() => onClick(reportId)}
            className="flex cursor-pointer flex-col gap-4 rounded-sm bg-white px-6 py-4 transition-colors hover:bg-gray-50 md:flex-row md:items-center md:justify-between"
        >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-12">
                <p className="text-sm font-medium text-black">
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
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        console.log("Edit clicked for report:", reportId);
                    }}
                    className="text-md text-black transition-colors hover:text-gray-600"
                >
                    <FontAwesomeIcon icon={faEdit} />
                </button>

                <button
                    type="button"
                    onClick={(event) => {
                        // important prevents the dashboard from appearing on edit/delete button press
                        event.stopPropagation();
                        console.log("Delete clicked for report:", reportId);
                    }}
                    className="text-md text-black transition-colors hover:text-red-600"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
}