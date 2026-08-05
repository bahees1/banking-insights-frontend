import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDatabase,
    faKey,
    faShieldHalved,
    faUserLock,
} from "@fortawesome/free-solid-svg-icons";

const securityItems = [
    {
        title: "No bank credentials",
        description:
            "Upload statements directly. No online banking username or password required.",
        icon: faKey,
    },
    {
        title: "Minimal data collection",
        description:
            "Only the transaction data needed for spending analysis is processed.",
        icon: faDatabase,
    },
    {
        title: "Verified authentication",
        description:
            "Protected requests require a valid Clerk session and verified token.",
        icon: faShieldHalved,
    },
    {
        title: "Private report access",
        description:
            "Each user can access only the reports linked to their own account.",
        icon: faUserLock,
    },
];

export default function PrivacySection() {
    return (
        <section className="px-6 py-20 md:px-12 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="rounded-3xl border border-blue-100 bg-blue-50/70 px-6 py-10 sm:px-8 md:py-14 lg:px-12">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
                            <FontAwesomeIcon
                                icon={faShieldHalved}
                                className="h-6 w-6"
                            />
                        </div>

                        <h6 className="mt-6 font-semibold uppercase tracking-wider text-blue-600">
                            Privacy and security
                        </h6>

                        <h4 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Built to protect access and limit unnecessary data
                        </h4>
                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {securityItems.map((item) => (
                            <article
                                key={item.title}
                                className="rounded-2xl border border-blue-100 bg-white px-5 py-5 shadow-sm"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                    <FontAwesomeIcon
                                        icon={item.icon}
                                        className="h-5 w-5"
                                    />
                                </div>

                                <h5 className="mt-5 font-semibold text-slate-900">
                                    {item.title}
                                </h5>

                                <p className="mt-2 text-md leading-6 text-slate-600">
                                    {item.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}