import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useSignIn, useUser } from "@clerk/nextjs";

export default function DemoPage() {
    const router = useRouter();

    const { signIn } = useSignIn();
    const { user } = useUser();

    const hasAttemptedDemoSignIn = useRef<boolean>(false);
    const hasFinalizedDemoSignIn = useRef<boolean>(false);

    const [isStartingDemo, setIsStartingDemo] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    // Step 1: create and consume the demo ticket
    useEffect(() => {
        if (!signIn) {
            return;
        }

        if (user) {
            router.replace("/reports");
            return;
        }

        if (hasAttemptedDemoSignIn.current) {
            return;
        }

        hasAttemptedDemoSignIn.current = true;

        async function startDemoSession() {
            try {
                setIsStartingDemo(true);
                setErrorMessage("");

                const response = await fetch("/api/demo/sign-in-token", {
                    method: "POST",
                });

                if (!response.ok) {
                    throw new Error(
                        "Unable to create demo sign-in token."
                    );
                }

                const data: { token: string } = await response.json();

                const { error } = await signIn.ticket({
                    ticket: data.token,
                });

                if (error) {
                    console.error(
                        "Clerk demo sign-in error:",
                        JSON.stringify(error, null, 2)
                    );

                    if (error.status === 429) {
                        throw new Error(
                            "Demo sign-in is temporarily rate limited. Please wait a moment and try again."
                        );
                    }

                    throw new Error(
                        "Unable to sign in to the demo account."
                    );
                }
            } catch (error) {
                console.error(
                    "Unable to start demo session:",
                    error
                );

                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage(
                        "Unable to start the demo right now. Please try again."
                    );
                }

                setIsStartingDemo(false);
            }
        }

        startDemoSession();
    }, [signIn, user, router]);

    // Step 2: wait for Clerk's sign-in state to become complete
    useEffect(() => {
        if (
            !signIn ||
            signIn.status !== "complete" ||
            hasFinalizedDemoSignIn.current
        ) {
            return;
        }

        hasFinalizedDemoSignIn.current = true;

        async function finalizeDemoSession() {
            try {
                const demoReportId =
                    process.env.NEXT_PUBLIC_DEMO_REPORT_ID;

                if (!demoReportId) {
                    throw new Error(
                        "Demo report ID is not configured."
                    );
                }

                const { error } = await signIn.finalize({
                    navigate: async ({ session, decorateUrl }) => {
                        if (session?.currentTask) {
                            console.error(
                                "Demo session requires another Clerk task:",
                                session.currentTask
                            );

                            throw new Error(
                                "Demo session requires additional authentication."
                            );
                        }

                        const redirectUrl = decorateUrl(
                            `/reports/${demoReportId}`
                        );

                        if (redirectUrl.startsWith("http")) {
                            window.location.href = redirectUrl;
                            return;
                        }

                        await router.push(redirectUrl);
                    },
                });

                if (error) {
                    console.error(
                        "Clerk finalize error:",
                        JSON.stringify(error, null, 2)
                    );

                    throw new Error(
                        "Unable to activate the demo session."
                    );
                }
            } catch (error) {
                console.error(
                    "Unable to finalize demo session:",
                    error
                );

                if (error instanceof Error) {
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage(
                        "Unable to start the demo right now. Please try again."
                    );
                }

                setIsStartingDemo(false);
            }
        }

        finalizeDemoSession();
    }, [signIn, signIn?.status, router]);

    return (
        <main className="flex min-h-screen items-center justify-center px-6">
            <div className="flex flex-col items-center gap-4 text-center">
                {errorMessage ? (
                    <>
                        <h5 className="font-semibold text-black">
                            Demo unavailable
                        </h5>

                        <p className="text-sm text-gray-600">
                            {errorMessage}
                        </p>

                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            className="rounded-md bg-gray-100 px-4 py-2 text-sm text-black transition-colors hover:bg-gray-200"
                        >
                            Go Back
                        </button>
                    </>
                ) : (
                    <>
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />

                        <h5 className="font-semibold text-black">
                            Starting demo
                        </h5>

                        <p className="text-sm text-gray-600">
                            Loading your demo workspace...
                        </p>
                    </>
                )}
            </div>
        </main>
    );
}