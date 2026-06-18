import { Insight } from "@/types/insight";
import TopInsights from "@/components/TopInsights";
import MonthlyTrends from "@/components/MonthlyTrends";

type InsightDashboardProps = {
    insights: Insight[];
};

export default function InsightDashboard({
    insights,
}: InsightDashboardProps) {
    return (
        <div className="flex flex-col gap-6">
            <TopInsights insights={insights} />
            <MonthlyTrends insights={insights} />
        </div>
    );
}