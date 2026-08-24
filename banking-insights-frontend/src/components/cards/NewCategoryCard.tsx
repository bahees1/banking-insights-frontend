import { formatCategory, formatMonth } from "@/utils/formatters";

export type NewCategoryItem = {
    category: string;
    amount: number;
};

type NewCategoryCardProps = {
    title: string;
    month: string;
    categories: NewCategoryItem[];
};

export default function NewCategoryCard({
    title,
    month,
    categories,
}: NewCategoryCardProps) {
    return (
        <div className="flex min-h-[150px] w-full flex-col gap-4 rounded-xl bg-white px-5 py-5 shadow-sm lg:flex-1">
            <p className="!font-semibold text-black">
                {title}
            </p>

            <div className="flex flex-col gap-3">
                {categories.map((item) => (
                    <div
                        key={item.category}
                        className="flex items-center justify-between gap-4"
                    >
                        <p className="text-sm text-gray-600">
                            {formatCategory(item.category)}
                        </p>

                        <p className="text-sm text-black">
                            {formatMonth(month)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}