type InsightUnavailableCardProps = {
    message: string;
};

export default function InsightUnavailableCard({
    message,
}: InsightUnavailableCardProps) {
    return (
        <div className="flex min-h-[120px] w-full items-center rounded-xl bg-white px-5 py-5 shadow-sm">
            <p className="text-sm text-gray-500">
                {message}
            </p>
        </div>
    );
}