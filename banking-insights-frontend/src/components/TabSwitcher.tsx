export type DashboardTab = "transactions" | "insights";

type TabSwitcherProps = {
    activeTab: DashboardTab;
    onTabChange: (tab: DashboardTab) => void;
};

export default function TabSwitcher({
    activeTab,
    onTabChange,
}: TabSwitcherProps) {
    const sliderPosition =
        activeTab === "transactions"
            ? "translate-x-0"
            : "translate-x-[calc(100%+12px)]";

    return (
        <div className="flex h-14 items-center justify-center">
            <div className="relative flex h-[90%] w-fit items-center gap-3 rounded-lg bg-white p-1 shadow-sm">
                <div
                    className={`
                        absolute
                        left-1
                        top-1/2
                        h-[calc(100%-8px)]
                        w-[120px]
                        -translate-y-1/2
                        rounded-md
                        bg-blue-500
                        shadow-sm
                        transition-transform
                        duration-300
                        ease-in-out
                        ${sliderPosition}
                    `}
                />

                <button
                    type="button"
                    onClick={() => onTabChange("transactions")}
                    className={`
                        relative
                        z-10
                        flex
                        h-full
                        w-[120px]
                        items-center
                        justify-center
                        rounded-md
                        text-sm
                        font-semibold
                        transition-colors
                        ${
                            activeTab === "transactions"
                                ? "text-white"
                                : "text-gray-600 hover:text-black"
                        }
                    `}
                >
                    Transactions
                </button>

                <button
                    type="button"
                    onClick={() => onTabChange("insights")}
                    className={`
                        relative
                        z-10
                        flex
                        h-full
                        w-[120px]
                        items-center
                        justify-center
                        rounded-md
                        text-sm
                        font-semibold
                        transition-colors
                        ${
                            activeTab === "insights"
                                ? "text-white"
                                : "text-gray-600 hover:text-black"
                        }
                    `}
                >
                    Insights
                </button>
            </div>
        </div>
    );
}