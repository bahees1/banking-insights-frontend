type TopInsightCardProps = {
    title: string;
    label: string;
    value: string;
};
export default function TopInsightCard({
    title,
    label,
    value,
}: TopInsightCardProps) {
    return (
        <div className="flex min-h-[120px] w-full flex-col gap-4 rounded-xl bg-white px-5 py-5 shadow-sm lg:flex-1">
            <p className="!font-semibold text-black">
                {title}
            </p>

            <div className="flex flex-col">
                 <p className=" md:!text-2xl text-end font-semibold text-black">
                    {value}
                </p>
                <p className="!text-md text-end text-gray-600">
                    {label}
                </p>

               
            </div>
        </div>
    );
}