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
        <section className="px-6 py-50 md:px-12 lg:px-16">
            <div className="mx-auto flex max-w-7xl flex-col items-center text-center">

                {/* Heading */}
                <h2 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                    See insights beyond your typical banking dashboard
                </h2>

                {/* Subheading */}
                <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                    Import bank statements from multiple accounts to discover spending trends, favorite merchants, 
                    unusual purchases, and category insights—all in one dashboard.
                </p>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <Link
                        href="/demo"
                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                        Explore Demo
                        <span className="ml-2">→</span>
                    </Link>

                    <Link
                        href="/sign-up"
                        className="inline-flex items-center justify-center rounded-xl shadow-sm bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                    >
                        Create Account
                    </Link>
                </div>

                <p className="mt-4 !text-sm text-slate-500">
                    Try the demo instantly. No account required.
                </p>

                {/* Dashboard Screenshot */}
                <div className="mt-16 w-full max-w-6xl">
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl">
                        <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />

                            <span className="ml-2 text-xs font-medium text-slate-400">
                                Personal Spending Insights
                            </span>
                        </div>

                        <Image
                            src="/images/landing/dashboard-preview.png"
                            alt="Dashboard showing merchant trends, unusual purchases and spending insights."
                            width={1600}
                            height={1000}
                            priority
                            className="h-auto w-full rounded-b-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}