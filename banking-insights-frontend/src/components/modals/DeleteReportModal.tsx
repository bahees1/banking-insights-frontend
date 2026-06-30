type DeleteReportModalProps = {
    isOpen: boolean;
    reportName: string;
    isDeleting: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export default function DeleteReportModal({
    isOpen,
    reportName,
    isDeleting,
    onClose,
    onConfirm,
}: DeleteReportModalProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-6 py-8">
            <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl bg-white px-6 py-6 shadow-sm">
                <div className="flex flex-col gap-2">
                    <h5 className="text-xl font-semibold text-black">
                        Delete Report
                    </h5>

                    <p className="!text-md text-gray-600">
                        Are you sure you want to delete{" "}
                        <span className="font-bold text-blue-500">
                            {reportName}
                        </span>
                        ? This action cannot be undone.
                    </p>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="rounded-md bg-gray-100 px-4 py-2 text-sm text-black disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="rounded-md bg-red-500 px-4 py-2 text-sm text-white disabled:opacity-50"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}