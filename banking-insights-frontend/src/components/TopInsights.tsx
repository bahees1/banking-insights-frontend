import { Insight } from "@/types/insight";
import TopInsightCard from "@/components/cards/TopInsightCard";
import FlexScoreCard from "@/components/cards/FlexScoreCard";

type TopInsightsProps = {
    insights: Insight[];
};

export default function TopInsights({
    insights,
}: TopInsightsProps) {
    const highestSpentCategory = findInsight(insights, "HIGHEST_SPENT_CATEGORY");
    const unusualMerchant = findInsight(insights, "UNUSUAL_MERCHANT");
    const largeSingleTransaction = findInsight(insights, "LARGE_SINGLE_TRANSACTION");
    const flexScore = findInsight(insights, "FLEX_SCORE");
    
    const highestSpentCategoryMetadata =
        parseMetadata<HighestSpentCategoryMetadata>(
            highestSpentCategory?.metadataJson ?? null
        );

    const unusualMerchantMetadata =
        parseMetadata<MerchantAmountMetadata>(
            unusualMerchant?.metadataJson ?? null
        );

    const largeSingleTransactionMetadata =
        parseMetadata<MerchantAmountMetadata>(
            largeSingleTransaction?.metadataJson ?? null
        );

    const flexScoreMetadata =
        parseMetadata<FlexScoreMetadata>(
            flexScore?.metadataJson ?? null
        );

    return (
        <section className="flex flex-col gap-4">
            <h5 className="font-medium text-black">
                Top Insights
            </h5>

            <div className="flex flex-col gap-4 lg:flex-row">

                {flexScoreMetadata ? (
                    <FlexScoreCard
                        score={flexScoreMetadata.score}
                        necessitiesAmount={flexScoreMetadata.necessitiesAmount}
                        nonNecessitiesAmount={flexScoreMetadata.nonNecessitiesAmount}
                    />
                ) : (
                    <TopInsightCard
                        title="Flex Score"
                        label="No score found"
                        value="-"
                    />
                )}

                <TopInsightCard
                    title="Highest Spent Category"
                    label={
                        highestSpentCategoryMetadata
                            ? formatCategory(highestSpentCategoryMetadata.all.category)
                            : "No category found"
                    }
                    value="-"
                    amount={highestSpentCategoryMetadata?.all.amount}
                />

                <TopInsightCard
                    title="Unusual Merchant"
                    label={unusualMerchantMetadata?.merchant ?? "No merchant found"}
                    value="-"
                    amount={unusualMerchantMetadata?.amount}
                />

                <TopInsightCard
                    title="Large Single Transaction"
                    label={largeSingleTransactionMetadata?.merchant ?? "No transaction found"}
                    value="-"
                    amount={largeSingleTransactionMetadata?.amount}
                />
            </div>
        </section>
    );
}

function findInsight(insights: Insight[], type: string): Insight | undefined {
    return insights.find((insight) => insight.type === type);
}

type HighestSpentCategoryMetadata = {
    all: {
        category: string;
        amount: number;
    };
};

type MerchantAmountMetadata = {
    merchant: string;
    amount: number;
};

type FlexScoreMetadata = {
    score: number;
    necessitiesAmount: number;
    nonNecessitiesAmount: number;
    untrackedAmount: number;
    essentialCategories: string[];
    nonEssentialCategories: string[];
};

function parseMetadata<T>(metadataJson: string | null): T | null {
    if (!metadataJson) {
        return null;
    }

    try {
        return JSON.parse(metadataJson) as T;
    } catch {
        return null;
    }
}

function formatCurrency(value: number): string {
    return new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
    }).format(value);
}

function formatCategory(category: string): string {
    return category
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

