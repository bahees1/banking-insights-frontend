export type UploadedFile = {
    uploadedFileId: string;
    originalFileName: string;
    fileType: string;
    uploadedAt: string;
};

export type ReportSummary = {
    reportId: string;
    fileName: string;
    createdAt: string;

    totalTransactions: number;
    totalIncome: number;
    totalExpenses: number;
    netCashFlow: number;

    uploadedFiles: UploadedFile[];
};