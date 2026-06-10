import { apiFetch } from "@/lib/api";
import { ReportListItem } from "@/types/report";
import { ReportSummary } from "@/types/reportSummary";
import { Transaction } from "@/types/transaction";

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