import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBolt,
    faCodeBranch,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-slate-200 bg-white px-6 py-10 md:px-12 lg:px-16">
            <div className="mx-auto flex max-w-7xl flex-col gap-8">
                <div className="flex flex-col items-center justify-between gap-7 md:flex-row">
                    {/* Brand */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-md font-semibold text-blue-600"
                    >
                        <FontAwesomeIcon
                            icon={faBolt}
                            className="h-4 w-4"
                        />

                        <span>Personal Spending Insights</span>
                    </Link>

                    {/* Navigation */}
                    <nav
                        aria-label="Footer navigation"
                        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
                    >
                        <Link
                            href="/demo"
                            className="text-md font-medium text-slate-600 transition-colors hover:text-blue-600"
                        >
                            Explore Demo
                        </Link>

                        <Link
                            href="/sign-in"
                            className="text-md font-medium text-slate-600 transition-colors hover:text-blue-600"
                        >
                            Sign In
                        </Link>

                        <Link
                            href="/sign-up"
                            className="text-md font-medium text-slate-600 transition-colors hover:text-blue-600"
                        >
                            Create Account
                        </Link>

                        <a
                            href="YOUR_GITHUB_REPOSITORY_URL"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-md font-medium text-slate-600 transition-colors hover:text-blue-600"
                        >
                            <FontAwesomeIcon
                                icon={faCodeBranch}
                                className="h-4 w-4"
                            />

                            GitHub
                        </a>
                    </nav>
                </div>

                <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-center sm:flex-row sm:text-left">
                    <p className="text-sm text-slate-500">
                        © {currentYear} Personal Spending Insights
                    </p>

                    <p className="text-sm text-slate-500">
                        Demo data is fictional and read-only.
                    </p>
                </div>
            </div>
        </footer>
    );
}