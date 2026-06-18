export function formatCategory(category: string): string {
    return category
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export function formatMonth(month: string): string {
    const [year, monthNumber] = month.split("-");
    const date = new Date(Number(year), Number(monthNumber) - 1);

    return date.toLocaleDateString("en-CA", {
        month: "short",
        year: "numeric",
    });
}

export function calculatePercentageChange(
    previousAmount: number,
    latestAmount: number
): number {
    if (previousAmount === 0) {
        return 100;
    }

    return Math.round(
        (Math.abs(latestAmount - previousAmount) / previousAmount) * 100
    );
}