export type Insight = {
    insightId: string;
    type: string;
    severity: string;
    title: string;
    description: string;
    recommendation: string;
    metricValue: number | null;
    metricLabel: string | null;
    createdAt: string;
    metadataJson: string | null;
};