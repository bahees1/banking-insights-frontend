type InsightStatCardProps = {
    title: string;
    label: string;
    value: string;
};

export default function InsightStatCard({
    title,
    label,
    value,
}: InsightStatCardProps) {
    return (
        <div className="flex min-h-[120px] w-full flex-col gap-4 rounded-xl bg-white px-5 py-5 shadow-sm lg:flex-1">
            <p className="text-sm font-medium text-black">
                {title}
            </p>

            <div className="flex flex-row gap-4 items-center">
                <p className="t text-gray-600">
                    {label}
                </p>

                <p className="font-semibold text-black">
                    {value}
                </p>
            </div>
        </div>
    );
}