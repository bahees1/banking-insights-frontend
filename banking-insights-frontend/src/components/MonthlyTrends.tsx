import { Insight } from "@/types/insight";
import { parseMetadata } from "@/utils/insightMetadata";
import TrendChangeCard, { CategoryChangeItem } from "@/components/cards/TrendChangeCard";
import NewCategoryCard, { NewCategoryItem } from "@/components/cards/NewCategoryCard";

type MonthlyTrendsProps = {
    insights: Insight[];
};

type CategoryChangeMetadata = {
    previousMonth: string;
    latestMonth: string;
    categories: CategoryChangeItem[];
};

type NewCategoryMetadata = {
    previousMonth: string;
    latestMonth: string;
    categories: NewCategoryItem[];
};

export default function MonthlyTrends({
    insights,
}: MonthlyTrendsProps) {
    const increasedInsight = findInsight(insights, "CATEGORY_INCREASED_FROM_PREVIOUS_MONTH");
    const decreasedInsight = findInsight(insights, "CATEGORY_DECREASED_FROM_PREVIOUS_MONTH");
    const newCategoryInsight = findInsight(insights, "NEW_CATEGORY_DETECTED");

    const increasedMetadata = parseMetadata<CategoryChangeMetadata>(
        increasedInsight?.metadataJson ?? null
    );

    const decreasedMetadata = parseMetadata<CategoryChangeMetadata>(
        decreasedInsight?.metadataJson ?? null
    );

    const newCategoryMetadata = parseMetadata<NewCategoryMetadata>(
        newCategoryInsight?.metadataJson ?? null
    );

    if (!increasedMetadata && !decreasedMetadata && !newCategoryMetadata) {
        return null;
    }

    return (
        <section className="flex flex-col gap-4">
            <h5 className="font-medium text-black">
                Monthly Trends
            </h5>

            <div className="flex flex-col gap-4 lg:flex-row">
                {increasedMetadata && (
                    <TrendChangeCard
                        title="Category with increase"
                        categories={increasedMetadata.categories.slice(0, 3)}
                        trendType="increase"
                    />
                )}

                {decreasedMetadata && (
                    <TrendChangeCard
                        title="Category with decrease"
                        categories={decreasedMetadata.categories.slice(0, 3)}
                        trendType="decrease"
                    />
                )}

                {newCategoryMetadata && (
                    <NewCategoryCard
                        title="New Categories"
                        month={newCategoryMetadata.latestMonth}
                        categories={newCategoryMetadata.categories.slice(0, 3)}
                    />
                )}
            </div>
        </section>
    );
}

function findInsight(insights: Insight[], type: string): Insight | undefined {
    return insights.find((insight) => insight.type === type);
}