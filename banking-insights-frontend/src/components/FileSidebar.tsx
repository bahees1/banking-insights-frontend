import { UploadedFile } from "@/types/reportSummary";

type FileSidebarProps = {
    uploadedFiles: UploadedFile[];
    selectedFileName: string;
    onSelectFile: (fileName: string) => void;
};

export default function FileSidebar({
    uploadedFiles,
    selectedFileName,
    onSelectFile,
}: FileSidebarProps) {
    const fileOptions = [
        {
            id: "ALL",
            label: "All Files",
        },
        ...uploadedFiles.map((file) => ({
            id: file.originalFileName,
            label: file.originalFileName,
        })),
    ];

    return (
        <aside className="w-full min-w-[180px] rounded-xl bg-white px-4 py-5 shadow-sm md:w-[240px] md:min-w-[220px]">
            <div className="flex flex-col gap-1 pb-4">
                <h6 className="!text-md font-medium text-gray-600">
                    File List
                </h6>
            </div>

            <div className="flex flex-col gap-2">
                {fileOptions.map((file) => (
                    <button
                        key={file.id}
                        type="button"
                        onClick={() => onSelectFile(file.id)}
                        className={`
                            w-full
                            truncate
                            rounded-md
                            px-3
                            py-2
                            text-left
                            text-sm
                            transition-colors
                            ${
                                selectedFileName === file.id
                                    ? "bg-blue-400 text-white"
                                    : "text-black hover:bg-gray-100"
                            }
                        `}
                    >
                        {file.label}
                    </button>
                ))}
            </div>
        </aside>
    );
}