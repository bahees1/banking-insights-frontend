import { apiFetch } from "@/lib/api";
import { ReportListItem } from "@/types/report";
import { ReportSummary } from "@/types/reportSummary";
import { Transaction } from "@/types/transaction";
import { Insight } from "@/types/insight";
import { UploadReportResponse } from "@/types/uploadReport";

type AuthOptions = {
    token?: string;
};

// this endpoint grabs all user reports for reports page
export async function getReports(
    authOptions: AuthOptions = {}
): Promise<ReportListItem[]> {
    const response = await apiFetch(
        "/api/reports",
        {
            method: "GET",
        },
        authOptions
    );

    if (!response.ok) {
        throw new Error("Failed to fetch reports.");
    }

    return response.json();
}

// for transaction dashboard this endpoint grabs the report summary (total income, expenses, cash flow)
export async function getReportSummary(
    reportId: string,
    authOptions: AuthOptions = {}
): Promise<ReportSummary> {
    const response = await apiFetch(
        `/api/reports/${reportId}`,
        {
            method: "GET",
        },
        authOptions
    );

    if (!response.ok) {
        throw new Error("Failed to fetch report summary.");
    }

    return response.json();
}

// endpoint to get all transactions for a report, used for transaction table and dashboard
export async function getTransactionsForReport(
    reportId: string,
    authOptions: AuthOptions = {}
): Promise<Transaction[]> {
    const response = await apiFetch(
        `/api/reports/${reportId}/transactions`,
        {
            method: "GET",
        },
        authOptions
    );

    if (!response.ok) {
        throw new Error("Failed to fetch transactions.");
    }

    return response.json();
}

// endpoint to upload files and create a new report, used in the createReport modal
export async function uploadReport(
    reportName: string,
    files: File[],
    authOptions: AuthOptions = {}
): Promise<UploadReportResponse> {
    const formData = new FormData();

    formData.append("reportName", reportName);

    files.forEach((file) => {
        formData.append("files", file);
    });

    const response = await apiFetch(
        "/api/reports/upload",
        {
            method: "POST",
            body: formData,
        },
        authOptions
    );

    if (!response.ok) {
        throw new Error("Failed to upload report.");
    }

    return response.json();
}

// endpoint to delete a report
export async function deleteReport(
    reportId: string,
    authOptions: AuthOptions = {}
): Promise<void> {
    const response = await apiFetch(
        `/api/reports/${reportId}`,
        {
            method: "DELETE",
        },
        authOptions
    );

    if (!response.ok) {
        throw new Error("Failed to delete report.");
    }
}

export async function getInsightsForReport(
    reportId: string,
    authOptions: AuthOptions = {}
): Promise<Insight[]> {
    const response = await apiFetch(
        `/api/reports/${reportId}/insights`,
        {
            method: "GET",
        },
        authOptions
    );

    if (!response.ok) {
        throw new Error("Failed to fetch insights.");
    }

    return response.json();
}