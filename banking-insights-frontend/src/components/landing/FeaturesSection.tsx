import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartLine,
    faFileImport,
    faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

const supportedFormats = [
    "CSV",
    "Excel",
    "RBC",
    "American Express",
];

const insightTypes = [
    "Most visited merchants",
    "Unusual purchases",
    "Spending habits",
    "Category breakdowns",
];

export default function FeaturesSection() {
    return (
        <section className="px-6 py-20 md:px-12 lg:px-16">
            <div className="mx-auto max-w-7xl">
                {/* Section heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <h6 className="font-semibold uppercase tracking-wider text-blue-600">
                        How it works
                    </h6>

                    <h4 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Everything you need to understand your spending
                    </h4>

                    <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                        Import statements from supported banks, combine multiple
                        accounts, and discover spending patterns through one
                        unified dashboard.
                    </p>
                </div>

                {/* Feature cards */}
                <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Import card */}
                    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <FontAwesomeIcon
                                icon={faFileImport}
                                className="h-5 w-5"
                            />
                        </div>

                        <p className="mt-6 font-semibold text-blue-600">
                            Step 1
                        </p>

                        <h3 className="mt-2 !text-xl font-semibold text-slate-900">
                            Import your bank statements
                        </h3>

                        <p className="mt-4 leading-7 text-slate-600">
                            Upload CSV or Excel statements from supported banks.
                            Transactions are automatically organized and prepared
                            for analysis.
                        </p>

                        <div className="mt-auto pt-7">
                            <p className="mb-3 !text-xs font-semibold uppercase tracking-wider text-slate-500">
                                Currently supports
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {supportedFormats.map((format) => (
                                    <span
                                        key={format}
                                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700"
                                    >
                                        {format}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>

                    {/* Unified dashboard card */}
                    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <FontAwesomeIcon
                                icon={faLayerGroup}
                                className="h-5 w-5"
                            />
                        </div>

                        <p className="mt-6 font-semibold text-blue-600">
                            Step 2
                        </p>

                        <h3 className="mt-2 !text-xl font-semibold text-slate-900">
                            View everything in one dashboard
                        </h3>

                        <p className="mt-4 leading-7 text-slate-600">
                            Combine transactions from multiple banks into one
                            place to understand your spending without switching
                            between separate banking apps.
                        </p>

                        <div className="mt-auto pt-7">
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <div className="flex items-center justify-between gap-3 text-sm font-medium">
                                    <span className="text-slate-600">
                                        Multiple accounts
                                    </span>

                                    <span
                                        aria-hidden="true"
                                        className="text-blue-600"
                                    >
                                        →
                                    </span>

                                    <span className="text-slate-900">
                                        One dashboard
                                    </span>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Insights card */}
                    <article className="flex h-full flex-col rounded-2xl border border-blue-300 bg-blue-50/40 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:col-span-2 lg:col-span-1 sm:p-8">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
                            <FontAwesomeIcon
                                icon={faChartLine}
                                className="h-5 w-5"
                            />
                        </div>

                        <p className="mt-6 font-semibold text-blue-600">
                            Step 3
                        </p>

                        <h3 className="mt-2 !text-xl font-semibold text-slate-900">
                            Discover spending patterns
                        </h3>

                        <p className="mt-4 leading-7 text-slate-600">
                            Turn your transaction history into clear,
                            deterministic insights that help you understand
                            where, how, and how often you spend.
                        </p>

                        <ul className="mt-auto space-y-3 pt-7">
                            {insightTypes.map((insight) => (
                                <li
                                    key={insight}
                                    className="flex items-center gap-3 text-sm font-medium text-slate-700"
                                >
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                                        ✓
                                    </span>

                                    <span>{insight}</span>
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>
            </div>
        </section>
    );
}