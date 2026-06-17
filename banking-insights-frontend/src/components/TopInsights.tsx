import { Insight } from "@/types/insight";
import TopInsightCard from "@/components/TopInsightCard";

type TopInsightsProps = {
    insights: Insight[];
};

export default function TopInsights({
    insights,
}: TopInsightsProps) {
    const highestSpentCategory = findInsight(insights, "HIGHEST_SPENT_CATEGORY");
    const unusualMerchant = findInsight(insights, "UNUSUAL_MERCHANT");
    const largeSingleTransaction = findInsight(insights, "LARGE_SINGLE_TRANSACTION");

    return (
        <section className="flex flex-col gap-4">
            <h5 className="text-sm font-medium text-black">
                Top Insights
            </h5>

            <div className="flex flex-col gap-4 lg:flex-row">
                <TopInsightCard
                    title="Highest Spent Category"
                    label="Category Name"
                    value="$0"
                />

                <TopInsightCard
                    title="Unusual Merchant"
                    label="Merchant Name"
                    value="$0"
                />

                <TopInsightCard
                    title="Flex Score"
                    label="Coming soon..."
                    value="$0"
                />

                <TopInsightCard
                    title="Large Single Transaction"
                    label="Merchant Name"
                    value="$0"
                />
            </div>
        </section>
    );
}

function findInsight(insights: Insight[], type: string): Insight | undefined {
    return insights.find((insight) => insight.type === type);
}

