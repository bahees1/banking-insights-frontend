import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadReport } from "../../pages/api/reports";

type CreateReportModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onReportCreated: () => void;
    getAuthToken: () => Promise<string | null>;
};

// file upload constraints for helper text on form
const MAX_FILES = 7;
const MAX_FILE_SIZE_BYTES = 3 * 1024 * 1024;

export default function CreateReportModal({
    isOpen,
    onClose,
    onReportCreated,
    getAuthToken,
}: CreateReportModalProps) {
    const [reportName, setReportName] = useState<string>("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isUploading, setIsUploading] = useState<boolean>(false);

    async function handleCreateReport() {
        if (selectedFiles.length > MAX_FILES) {
            setErrorMessage("You can upload a maximum of 7 files.");
            return;
        }
        try {
            setIsUploading(true);
            setErrorMessage("");

            const token = await getAuthToken();

            await uploadReport(reportName.trim(), selectedFiles, {
                token,
            });

            setReportName("");
            setSelectedFiles([]);

            onReportCreated();
            onClose();
        } catch (error) {
            setErrorMessage("Unable to create report. Please try again.");
        } finally {
            setIsUploading(false);
        }
    }

    // file upload handler with validation for max files, duplicate files, and file size/type (handled by react-dropzone)
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setErrorMessage("");

        const nextFiles = [...selectedFiles, ...acceptedFiles];

        if (nextFiles.length > MAX_FILES) {
            setErrorMessage("You can upload a maximum of 7 files.");
            return;
        }

        const duplicateFile = nextFiles.find((file, index) => {
            return nextFiles.findIndex((otherFile) => otherFile.name.toLowerCase() === file.name.toLowerCase()) !== index;
        });

        if (duplicateFile) {
            setErrorMessage(`Duplicate file detected: ${duplicateFile.name}`);
            return;
        }

        setSelectedFiles(nextFiles);
    }, [selectedFiles]);

    // react-dropzone setup with file type and size restrictions
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        fileRejections,
    } = useDropzone({
        onDrop,
        multiple: true,
        maxFiles: MAX_FILES,
        maxSize: MAX_FILE_SIZE_BYTES,
        accept: {
            "text/csv": [".csv"],
            "application/vnd.ms-excel": [".xls"],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
        },
    });

    // if modal is not open, don't render anything
    if (!isOpen) {
        return null;
    }

    // validation for report name input field
    const reportNameIsInvalid = reportName.trim().length > 0 && reportName.trim().length < 3;

    return (
        <div className="min-w-[340px] fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-6 py-8">
            <div className="flex rounded-2xl w-full max-w-3xl flex-col gap-8 bg-white px-8 py-8 md:px-12">
                <div className="flex items-center justify-between">
                    <h5 className="text-2xl font-medium text-black">
                        Create Report
                    </h5>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg px-3 py-2 font-semibold text-md text-gray-500 transition-colors hover:bg-gray-100 active:bg-gray-200"
                    >
                        Close
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    <input
                        value={reportName}
                        onChange={(event) => setReportName(event.target.value)}
                        placeholder="Enter report name"
                        className="w-full bg-[#F6F6F6] px-4 py-3 text-base outline-none"
                    />

                    {reportNameIsInvalid && (
                        <p className="text-red-600">
                            Report name must be at least 3 characters.
                        </p>
                    )}
                </div>

                <div
                    {...getRootProps()}
                    className="flex min-h-56 cursor-pointer items-center justify-center bg-[#F6F6F6] px-6 py-10 text-center"
                >
                    <input {...getInputProps()} />

                    <div className="flex flex-col gap-3">
                        <p className="text-base text-black">
                            {isDragActive
                                ? "Drop your files here"
                                : "Upload File / Drag & Drop file"}
                        </p>

                        <p className="text-sm text-gray-600">
                            Supported files: CSV, XLS, XLSX • Maximum 7 files • 3 MB per file
                        </p>
                    </div>
                </div>

                {selectedFiles.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-black">
                            Selected files
                        </p>

                        <div className="flex flex-col gap-2">
                            {selectedFiles.map((file) => (
                                <div
                                    key={file.name}
                                    className="flex items-center justify-between bg-[#F6F6F6] px-4 py-2"
                                >
                                    <p className="text-sm text-gray-800">
                                        {file.name}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedFiles((currentFiles) =>
                                                currentFiles.filter((currentFile) => currentFile.name !== file.name)
                                            );
                                        }}
                                        className="text-sm text-red-600"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {fileRejections.length > 0 && (
                    <div className="flex flex-col gap-2">
                        {fileRejections.map((rejection) => (
                            <p key={rejection.file.name} className="text-sm text-red-600">
                                {rejection.file.name} is not supported or exceeds the 3 MB limit.
                            </p>
                        ))}
                    </div>
                )}

                {errorMessage && (
                    <p className=" text-red-600">
                        {errorMessage}
                    </p>
                )}

                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={handleCreateReport}
                        disabled={reportName.trim().length < 3 || selectedFiles.length === 0 || selectedFiles.length > MAX_FILES || isUploading}
                        className="bg-blue-500 px-6 py-4 rounded-md text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isUploading ? "Generating..." : "Generate Report"}
                    </button>
                </div>
            </div>
        </div>
    );
}