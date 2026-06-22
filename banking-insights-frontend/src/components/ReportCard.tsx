import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

type ReportCardProps = {
    reportId: string;
    reportName: string;
    dateCreated: string;
    fileCount: number;
    onClick: (reportId: string) => void;
    onDeleteClick: (reportId: string, reportName: string) => void;
};

export default function ReportCard({
    reportId,
    reportName,
    dateCreated,
    fileCount,
    onClick,
    onDeleteClick,
}: ReportCardProps) {
    return (
        <div
            onClick={() => onClick(reportId)}
            className="flex min-w-[340px] cursor-pointer flex-row gap-4 rounded-lg shadow-sm bg-white px-6 py-4 transition-colors hover:bg-gray-50 justify-between"
        >
            <div className="flex flex-col gap-6 md:items-start">
                <p className="!font-semibold text-black">
                    {reportName}
                </p>
                <div className="flex flex-row gap-4">
                    <p className="text-sm text-gray-500">
                        {dateCreated}
                    </p>
                    •
                    <p className="text-sm text-blue-500">
                        {fileCount} files
                    </p>

                </div>
                
            </div>

            <div className="flex items-center gap-6">
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onDeleteClick(reportId, reportName);
                    }}
                    className="!text-md md:text-xl text-black transition-colors hover:text-red-600"
                >
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
}