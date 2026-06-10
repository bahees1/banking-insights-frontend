export type Transaction = {
    transactionId: string;
    transactionDate: string;
    rawDescription: string;
    normalizedMerchant: string;
    category: string;
    amount: number;
    accountType: string;
    cashFlowType: string | null;
    sourceFileName: string | null;
};