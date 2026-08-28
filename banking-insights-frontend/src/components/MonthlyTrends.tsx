import { Insight } from "@/types/insight";
import { parseMetadata } from "@/utils/insightMetadata";
import TrendChangeCard, {
    CategoryChangeItem,
} from "@/components/cards/TrendChangeCard";
import NewCategoryCard, {
    NewCategoryItem,
} from "@/components/cards/NewCategoryCard";

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
    const increasedInsight = findInsight(
        insights,
        "CATEGORY_INCREASED_FROM_PREVIOUS_MONTH"
    );

    const decreasedInsight = findInsight(
        insights,
        "CATEGORY_DECREASED_FROM_PREVIOUS_MONTH"
    );

    const newCategoryInsight = findInsight(
        insights,
        "NEW_CATEGORY_DETECTED"
    );

    const increasedMetadata =
        parseMetadata<CategoryChangeMetadata>(
            increasedInsight?.metadataJson ?? null
        );

    const decreasedMetadata =
        parseMetadata<CategoryChangeMetadata>(
            decreasedInsight?.metadataJson ?? null
        );

    const newCategoryMetadata =
        parseMetadata<NewCategoryMetadata>(
            newCategoryInsight?.metadataJson ?? null
        );

    return (
        <section className="flex flex-col gap-4">
            <h5 className="font-medium text-black">
                Monthly Trends
            </h5>

            <div className="flex flex-col gap-4 lg:flex-row">
                {/* Increased spending */}
                {increasedMetadata ? (
                    <TrendChangeCard
                        title="Increased Spending"
                        previousMonth={increasedMetadata.previousMonth}
                        latestMonth={increasedMetadata.latestMonth}
                        categories={increasedMetadata.categories.slice(0, 3)}
                        trendType="increase"
                    />
                ) : (
                    <MonthlyTrendUnavailableCard
                        title="Increased Spending"
                        message="No spending increases were found."
                    />
                )}

                {/* Decreased spending */}
                {decreasedMetadata ? (
                    <TrendChangeCard
                        title="Decreased Spending"
                        previousMonth={decreasedMetadata.previousMonth}
                        latestMonth={decreasedMetadata.latestMonth}
                        categories={decreasedMetadata.categories.slice(0, 3)}
                        trendType="decrease"
                    />
                ) : (
                    <MonthlyTrendUnavailableCard
                        title="Decreased Spending"
                        message="No spending decreases were found."
                    />
                )}

                {/* New categories */}
                {newCategoryMetadata ? (
                    <NewCategoryCard
                        title="New Categories"
                        month={newCategoryMetadata.latestMonth}
                        categories={newCategoryMetadata.categories.slice(0, 3)}
                    />
                ) : (
                    <MonthlyTrendUnavailableCard
                        title="New Categories"
                        message="No new spending categories."
                    />
                )}
            </div>
        </section>
    );
}

type MonthlyTrendUnavailableCardProps = {
    title: string;
    message: string;
};

function MonthlyTrendUnavailableCard({
    title,
    message,
}: MonthlyTrendUnavailableCardProps) {
    return (
        <div className="flex min-h-[150px] w-full flex-col gap-4 rounded-xl bg-white px-5 py-5 shadow-sm lg:flex-1">
            <p className="font-semibold text-black">
                {title}
            </p>

            <div className="flex flex-1 items-start justify-start">
                <p className="max-w-[240px] text-left text-sm leading-6 text-gray-500">
                    {message}
                </p>
            </div>
        </div>
    );
}

function findInsight(
    insights: Insight[],
    type: string
): Insight | undefined {
    return insights.find((insight) => insight.type === type);
}