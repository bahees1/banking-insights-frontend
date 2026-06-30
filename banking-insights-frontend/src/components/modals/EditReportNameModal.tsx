import { useEffect, useState } from "react";

type EditReportNameModalProps = {
    isOpen: boolean;
    currentReportName: string;
    isSaving: boolean;
    onClose: () => void;
    onSave: (newReportName: string) => void;
};

export default function EditReportNameModal({
    isOpen,
    currentReportName,
    isSaving,
    onClose,
    onSave,
}: EditReportNameModalProps) {
    const [reportName, setReportName] = useState<string>(currentReportName);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        if (isOpen) {
            setReportName(currentReportName);
            setErrorMessage("");
        }
    }, [isOpen, currentReportName]);

    if (!isOpen) {
        return null;
    }

    function handleSave() {
        const trimmedName = reportName.trim();

        if (trimmedName.length < 3) {
            setErrorMessage("Report name must be at least 3 characters.");
            return;
        }

        onSave(trimmedName);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-6 py-8">
            <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl bg-white px-6 py-6 shadow-sm">
                <div className="flex flex-col gap-2">
                    <h5 className="font-semibold text-black">
                        Edit Report Name
                    </h5>

                    <p className="text-sm text-gray-600">
                        Rename this report without changing its uploaded files.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-black">
                        Report Name
                    </label>

                    <input
                        type="text"
                        value={reportName}
                        onChange={(event) => setReportName(event.target.value)}
                        disabled={isSaving}
                        className="rounded-md border border-gray-300 px-4 py-3 text-sm text-black outline-none focus:border-blue-500"
                    />

                    {errorMessage && (
                        <p className="text-sm text-red-600">
                            {errorMessage}
                        </p>
                    )}
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSaving}
                        className="rounded-md bg-gray-100 px-4 py-2 text-sm text-black disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={isSaving}
                        className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white disabled:opacity-50"
                    >
                        {isSaving ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}