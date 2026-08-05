import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowDown,
    faDatabase,
    faDesktop,
    faLock,
    faServer,
} from "@fortawesome/free-solid-svg-icons";

const technologies = [
    "Next.js",
    "React",
    "TypeScript",
    "Spring Boot",
    "PostgreSQL",
    "Clerk",
];

const architectureSteps = [
    {
        title: "Next.js frontend",
        description: "Responsive dashboard and report experience",
        icon: faDesktop,
    },
    {
        title: "Clerk authentication",
        description: "Verified sessions and JWT-based requests",
        icon: faLock,
    },
    {
        title: "Spring Boot API",
        description: "Parsing, ownership checks, and insight calculations",
        icon: faServer,
    },
    {
        title: "PostgreSQL",
        description: "User-scoped reports and transaction data",
        icon: faDatabase,
    },
];

export default function TechnologySection() {
    return (
        <section className="px-6 py-20 md:px-12 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-20">
                    {/* Engineering summary */}
                    <div className="max-w-xl lg:w-[42%]">

                        <h4 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Built as a complete full-stack system
                        </h4>

                        <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                            A responsive frontend, secured API, deterministic
                            insight engine, and user-scoped persistence layer
                            work together as one product.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-2">
                            {technologies.map((technology) => (
                                <span
                                    key={technology}
                                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-md font-semibold text-slate-700"
                                >
                                    {technology}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Architecture flow */}
                    <div className="w-full lg:w-[52%]">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 sm:px-8 sm:py-8">
                            <div className="flex flex-col">
                                {architectureSteps.map((step, index) => (
                                    <div key={step.title}>
                                        <article className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                                <FontAwesomeIcon
                                                    icon={step.icon}
                                                    className="h-5 w-5"
                                                />
                                            </div>

                                            <div>
                                                <h6 className="font-semibold text-slate-900">
                                                    {step.title}
                                                </h6>

                                                <p className="mt-1 leading-6 text-slate-600">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </article>

                                        {index < architectureSteps.length - 1 && (
                                            <div
                                                aria-hidden="true"
                                                className="flex h-8 items-center justify-center text-blue-400"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faArrowDown}
                                                    className="h-3 w-3"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}