import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

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
            className="
                flex
                w-full
                cursor-pointer
                flex-row
                items-center
                justify-between
                gap-4
                rounded-xl
                border
                border-gray-200
                bg-white
                px-4
                py-5
                shadow-sm
                transition-all
                hover:border-blue-200
                hover:bg-blue-50/20
                sm:px-6
            "
        >
            {/* Report information */}
            <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-black">
                    {reportName}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                    <p className="text-gray-500">
                        {dateCreated}
                    </p>

                    <span className="text-gray-300">
                        •
                    </span>

                    <p className="font-medium text-blue-500">
                        {fileCount} {fileCount === 1 ? "file" : "files"}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-4">
                <button
                    type="button"
                    aria-label={`Delete ${reportName}`}
                    onClick={(event) => {
                        event.stopPropagation();
                        onDeleteClick(reportId, reportName);
                    }}
                    className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        text-gray-500
                        transition-colors
                        hover:bg-red-50
                        hover:text-red-600
                    "
                >
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="h-4 w-4"
                    />
                </button>

                <div className="flex h-9 w-9 items-center justify-center text-gray-400">
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className="h-4 w-4"
                    />
                </div>
            </div>
        </div>
    );
}