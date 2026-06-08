import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getReportSummary } from "@/pages/api/reports";
import { ReportSummary } from "@/types/reportSummary";

export default function ReportDashboardPage() {
    const router = useRouter();
    const { reportId } = router.query;

    const [reportSummary, setReportSummary] = useState<ReportSummary | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        if (!router.isReady || typeof reportId !== "string") {
            return;
        }

        async function loadReportSummary() {
            try {
                setIsLoading(true);
                setErrorMessage("");

                const summary = await getReportSummary(reportId);

                setReportSummary(summary);
            } catch (error) {
                setErrorMessage("Unable to load report summary.");
            } finally {
                setIsLoading(false);
            }
        }

        loadReportSummary();
    }, [router.isReady, reportId]);

    return (
        <main className="min-h-screen min-w-[320px]">

            <section className="px-6 pt-44 md:px-24 md:pt-32">
                {isLoading && (
                    <p className="text-sm text-gray-600">
                        Loading report...
                    </p>
                )}

                {errorMessage && (
                    <p className="text-sm text-red-600">
                        {errorMessage}
                    </p>
                )}

                {!isLoading && !errorMessage && reportSummary && (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            

                            <h5 className="text-2xl font-semibold text-black">
                                {reportSummary.fileName}
                            </h5>

                            <div className="flex flex-row gap-2 text-md text-gray-700">
                                <div>
                                    {formatReportDate(reportSummary.createdAt)}
                                </div>
                                •
                                <div>
                                    {reportSummary.uploadedFiles.length} Files
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <SummaryCard
                                label="Total Income"
                                value={formatCurrency(reportSummary.totalIncome)}
                            />

                            <SummaryCard
                                label="Total Expenses"
                                value={formatCurrency(reportSummary.totalExpenses)}
                            />

                            <SummaryCard
                                label="Net Cash Flow"
                                value={formatCurrency(reportSummary.netCashFlow)}
                            />
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}

type SummaryCardProps = {
    label: string;
    value: string;
};

function SummaryCard({ label, value }: SummaryCardProps) {
    return (
        <div className="bg-white px-6 py-5">
            <p className="text-sm text-gray-600">
                {label}
            </p>

            <p className="pt-2 text-xl font-semibold text-black">
                {value}
            </p>
        </div>
    );
}

function formatReportDate(dateValue: string): string {
    return new Date(dateValue).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
    }).format(value);
}