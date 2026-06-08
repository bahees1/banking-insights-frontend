import { useState } from "react";
import { UploadedFile } from "@/types/reportSummary";

type FileSidebarProps = {
    uploadedFiles: UploadedFile[];
};

export default function FileSidebar({
    uploadedFiles,
}: FileSidebarProps) {

    const [selectedFile, setSelectedFile] = useState<string>("all");

    const fileOptions = [
        {
            id: "all",
            label: "All",
        },
        ...uploadedFiles.map((file) => ({
            id: file.uploadedFileId,
            label: file.originalFileName,
        })),
    ];

    return (
        <aside className="w-full rounded-xl bg-white px-4 py-5 shadow-sm md:w-[220px] md:min-w-[220px]">

            <div className="flex flex-col gap-1 pb-4">
                <h6 className="text-sm font-medium text-black">
                    File List
                </h6>
            </div>

            <div className="flex flex-col gap-2">
                {fileOptions.map((file) => (
                    <button
                        key={file.id}
                        onClick={() => setSelectedFile(file.id)}
                        className={`
                            w-full
                            rounded-md
                            px-3
                            py-2
                            text-left
                            text-sm
                            transition-colors
                            truncate
                            ${
                                selectedFile === file.id
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