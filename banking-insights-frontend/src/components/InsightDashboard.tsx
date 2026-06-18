import { Insight } from "@/types/insight";
import TopInsights from "@/components/TopInsights";
import MonthlyTrends from "@/components/MonthlyTrends";
import RecurringBehaviour from "./RecurringBehaviour";

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
            <RecurringBehaviour insights={insights} />
        </div>
    );
}