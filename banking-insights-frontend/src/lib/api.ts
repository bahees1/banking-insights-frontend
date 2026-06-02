import { ReportListItem } from "@/types/report";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined.");
}

export async function getReports(): Promise<ReportListItem[]> {
    const response = await fetch(`${API_BASE_URL}/api/reports`);

    if (!response.ok) {
        throw new Error("Failed to fetch reports.");
    }

    return response.json();
}