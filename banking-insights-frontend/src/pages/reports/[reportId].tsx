import { useRouter } from "next/router";

export default function ReportDashboardPage() {
    const router = useRouter();
    const { reportId } = router.query;

    return (
        <main className="min-h-screen">
            <section className="px-6 pt-44 md:px-24 md:pt-32">
                <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-600">
                        Report Dashboard
                    </p>

                    <h1 className="text-2xl font-semibold text-black">
                        Transaction Dashboard
                    </h1>

                    <p className="text-sm text-gray-700">
                        Report ID: {typeof reportId === "string" ? reportId : "Loading..."}
                    </p>
                </div>
            </section>
        </main>
    );
}