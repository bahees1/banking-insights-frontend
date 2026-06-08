import { apiFetch } from "@/lib/api";
import { ReportListItem } from "@/types/report";
import { ReportSummary } from "@/types/reportSummary";

type AuthOptions = {
    token?: string;
};

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