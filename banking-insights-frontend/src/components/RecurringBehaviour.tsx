import { Insight } from "@/types/insight";
import { parseMetadata } from "@/utils/insightMetadata";
import RepeatedSmallChargesCard from "@/components/cards/RepeatedSmallChargesCard";
import SubscriptionInsightCard from "@/components/cards/SubscriptionInsightCard";
import InsightUnavailableCard from "@/components/cards/InsightUnavailableCard";
import MostSpentMerchantCard from "@/components/cards/MostSpentMerchantCard";

type RecurringBehaviourProps = {
    insights: Insight[];
};

type RepeatedSmallChargesMetadata = {
    threshold: number;
    transactionCount: number;
    totalAmount: number;
    transactionIds: string[];
};

type SubscriptionItem = {
    merchant: string;
    transactionCount: number;
    distinctMonthCount: number;
    months: string[];
    averageAmount: number;
    minAmount: number;
    maxAmount: number;
    sourceFileNames: string[];
    transactionIds: string[];
};

type SubscriptionMetadata = {
    subscriptions: SubscriptionItem[];
    minimumTransactionCount: number;
    minimumDistinctMonths: number;
    amountTolerancePercent: number;
};

type MostSpentMerchantMetadata = {
    merchant: string;
    totalAmount: number;
    transactionCount: number;
    transactionIds: string[];
    sourceFileNames: string[];
};

export default function RecurringBehaviour({
    insights,
}: RecurringBehaviourProps) {
    const repeatedSmallChargesInsight = findInsight(
        insights,
        "REPEATED_SMALL_CHARGES"
    );

    const subscriptionInsight = findInsight(
        insights,
        "SUBSCRIPTION_LIKE_MERCHANT"
    );

    const repeatedSmallChargesMetadata =
        parseMetadata<RepeatedSmallChargesMetadata>(
            repeatedSmallChargesInsight?.metadataJson ?? null
        );

    const subscriptionMetadata =
        parseMetadata<SubscriptionMetadata>(
            subscriptionInsight?.metadataJson ?? null
        );

    const topSubscription =
        subscriptionMetadata?.subscriptions?.[0];

    const mostSpentMerchantInsight = findInsight(
        insights,
        "MOST_SPENT_MERCHANT"
    );

    const mostSpentMerchantMetadata =
        parseMetadata<MostSpentMerchantMetadata>(
            mostSpentMerchantInsight?.metadataJson ?? null
        );

    return (
        <section className="flex flex-col gap-4">
            <h5 className="font-medium text-black">
                Recurring Behaviour
            </h5>

            <div className="flex flex-col gap-4 lg:flex-row">
                {!repeatedSmallChargesMetadata && !topSubscription && !mostSpentMerchantMetadata && (
                    <InsightUnavailableCard message="Recurring behaviour is not available right now." />
                )}

                {repeatedSmallChargesMetadata && (
                    <RepeatedSmallChargesCard
                        transactionCount={repeatedSmallChargesMetadata.transactionCount}
                        totalAmount={repeatedSmallChargesMetadata.totalAmount}
                    />
                )}

                {topSubscription && (
                    <SubscriptionInsightCard
                        merchant={topSubscription.merchant}
                        averageAmount={topSubscription.averageAmount}
                    />
                )}

                {mostSpentMerchantMetadata && (
                    <MostSpentMerchantCard
                        merchant={mostSpentMerchantMetadata.merchant}
                        totalAmount={mostSpentMerchantMetadata.totalAmount}
                    />
                )}
            </div>
        </section>
    );
}

function findInsight(insights: Insight[], type: string): Insight | undefined {
    return insights.find((insight) => insight.type === type);
}