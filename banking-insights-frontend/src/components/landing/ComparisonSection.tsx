import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBuildingColumns,
    faChartPie,
    faCheck,
    faList,
    faStore,
    faWallet,
} from "@fortawesome/free-solid-svg-icons";

const comparisonItems = [
    {
        icon: faBuildingColumns,
        traditional: "View one institution at a time",
        product: "Combine spending from multiple banks and accounts",
    },
    {
        icon: faList,
        traditional: "Review a basic transaction history",
        product: "See calculated spending patterns and trends",
    },
    {
        icon: faStore,
        traditional: "Limited merchant-level context",
        product: "Identify most-spent merchants and repeated purchases",
    },
    {
        icon: faChartPie,
        traditional: "Basic category totals",
        product: "Compare categories and monthly changes",
    },
    {
        icon: faWallet,
        traditional: "Separate dashboards for each account",
        product: "Use one unified spending dashboard",
    },
];

export default function ComparisonSection() {
    return (
        <section className="px-6 py-20 md:px-12 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-3xl text-center">
                    <h6 className="font-semibold uppercase tracking-wider text-blue-600">
                        Why it is different
                    </h6>

                    <h4 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Go beyond a typical banking dashboard
                    </h4>

                    <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                        Banking apps are useful for managing individual accounts.
                        This dashboard combines spending across institutions and
                        surfaces patterns that are easy to miss in a transaction
                        list.
                    </p>
                </div>

                <div className="mt-14 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="hidden grid-cols-2 border-b border-slate-200 bg-slate-50 md:grid">
                        <div className="px-6 py-4 text-sm font-semibold text-slate-600">
                            Typical bank dashboard
                        </div>

                        <div className="border-l border-slate-200 px-6 py-4 text-sm font-semibold text-blue-600">
                            Personal Spending Insights
                        </div>
                    </div>

                    <div className="divide-y divide-slate-200">
                        {comparisonItems.map((item) => (
                            <div
                                key={item.product}
                                className="grid gap-5 px-5 py-6 md:grid-cols-2 md:gap-0 md:px-0"
                            >
                                <div className="flex items-start gap-4 md:px-6">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                                        <FontAwesomeIcon
                                            icon={item.icon}
                                            className="h-4 w-4"
                                        />
                                    </div>

                                    <div>
                                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400 md:hidden">
                                            Typical bank dashboard
                                        </p>

                                        <p className="text-sm leading-6 text-slate-600">
                                            {item.traditional}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 rounded-xl bg-blue-50/60 p-4 md:rounded-none md:border-l md:border-slate-200 md:bg-transparent md:px-6 md:py-0">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className="h-4 w-4"
                                        />
                                    </div>

                                    <div>
                                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-blue-500 md:hidden">
                                            Personal Spending Insights
                                        </p>

                                        <p className="text-sm font-medium leading-6 text-slate-800">
                                            {item.product}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}