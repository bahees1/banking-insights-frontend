import Image from "next/image";
import Link from "next/link";

const supportedItems = [
    "CSV",
    "Excel",
    "RBC",
    "American Express",
];

export default function HeroSection() {
    return (
        <section className="overflow-hidden bg-slate-50 px-5 pb-20 pt-32 sm:px-8 md:pt-36 lg:px-12 lg:pb-28">
            <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                {/* Hero copy */}
                <div className="max-w-2xl">
                    <div className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-semibold text-blue-700 shadow-sm sm:text-sm">
                        <span>Secure</span>
                        <span
                            aria-hidden="true"
                            className="text-blue-300"
                        >
                            •
                        </span>
                        <span>Multi-bank</span>
                        <span
                            aria-hidden="true"
                            className="text-blue-300"
                        >
                            •
                        </span>
                        <span>Demo available</span>
                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        Your bank shows transactions.
                        <span className="mt-2 block text-blue-600">
                            We show spending patterns.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                        Import CSV and Excel statements from supported banks to
                        uncover merchant trends, unusual purchases, category
                        spending, and patterns across multiple accounts—all in
                        one dashboard.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/demo"
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Explore Demo
                            <span
                                aria-hidden="true"
                                className="ml-2"
                            >
                                →
                            </span>
                        </Link>

                        <Link
                            href="/sign-up"
                            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Create Account
                        </Link>
                    </div>

                    <p className="mt-4 text-sm text-slate-500">
                        Try the read-only demo instantly. No account required.
                    </p>

                    <div className="mt-8">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Currently supports
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {supportedItems.map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product screenshot */}
                <div className="relative">
                    <div
                        aria-hidden="true"
                        className="absolute -inset-6 rounded-[2.5rem] bg-blue-100/60 blur-3xl"
                    />

                    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-300/40 sm:rounded-3xl sm:p-3">
                        <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                            <span className="ml-2 text-xs font-medium text-slate-400">
                                Personal Spending Insights
                            </span>
                        </div>

                        <Image
                            src="/images/landing/dashboard-preview.png"
                            alt="Personal Spending Insights dashboard showing merchant trends, unusual purchases, and frequent purchases"
                            width={1400}
                            height={900}
                            priority
                            className="h-auto w-full rounded-b-xl object-cover"
                        />
                    </div>

                    <div className="absolute -bottom-5 -left-4 hidden rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg sm:block">
                        <p className="text-xs font-medium text-slate-500">
                            Unified spending view
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-900">
                            RBC + American Express
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}