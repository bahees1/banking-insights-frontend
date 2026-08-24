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

    const subscriptions =
        subscriptionMetadata?.subscriptions ?? [];

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

            {!repeatedSmallChargesMetadata
                && subscriptions.length === 0
                && !mostSpentMerchantMetadata && (
                <InsightUnavailableCard
                    message="Recurring behaviour is not available right now."
                />
            )}

            {(repeatedSmallChargesMetadata
                || subscriptions.length > 0
                || mostSpentMerchantMetadata) && (
                <div className="flex flex-col gap-4 md:flex-row">
                    {/* Left side: subscriptions */}
                    {subscriptions.length > 0 && (
                        <div className="w-full md:flex md:w-1/2">
                            <SubscriptionInsightCard
                                subscriptions={subscriptions}
                            />
                        </div>
                    )}

                    {/* Right side: supporting recurring insights */}
                    <div
                        className={
                            subscriptions.length > 0
                                ? "flex w-full flex-col gap-4 md:w-1/2"
                                : "flex w-full flex-col gap-4"
                        }
                    >
                        {repeatedSmallChargesMetadata && (
                            <RepeatedSmallChargesCard
                                transactionCount={
                                    repeatedSmallChargesMetadata.transactionCount
                                }
                                totalAmount={
                                    repeatedSmallChargesMetadata.totalAmount
                                }
                            />
                        )}

                        {mostSpentMerchantMetadata && (
                            <MostSpentMerchantCard
                                merchant={
                                    mostSpentMerchantMetadata.merchant
                                }
                                totalAmount={
                                    mostSpentMerchantMetadata.totalAmount
                                }
                            />
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}

function findInsight(
    insights: Insight[],
    type: string
): Insight | undefined {
    return insights.find((insight) => insight.type === type);
}