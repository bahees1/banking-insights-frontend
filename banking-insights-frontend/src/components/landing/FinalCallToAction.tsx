import Link from "next/link";

export default function FinalCallToAction() {
    return (
        <section className="px-6 py-20 md:px-12 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="rounded-3xl  px-6 py-12 text-center sm:px-10 md:py-16">
                    <h6 className="font-semibold uppercase tracking-wider text-blue-600">
                        Explore the product
                    </h6>

                    <h4 className="mx-auto mt-3 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        See what your transaction history can reveal
                    </h4>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                        Open a complete sample report and explore the dashboard
                        without creating an account.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/demo"
                            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
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
                            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-600 shadow-sm transition-colors hover:bg-blue-50"
                        >
                            Create Your Account
                        </Link>
                    </div>

                    <p className="mt-4 text-sm text-slate-500">
                        The demo uses sample financial data and is read-only.
                    </p>
                </div>
            </div>
        </section>
    );
}