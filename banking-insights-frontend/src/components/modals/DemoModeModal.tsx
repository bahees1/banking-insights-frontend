import { useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";

type DemoModeModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function DemoModeModal({
    isOpen,
    onClose,
}: DemoModeModalProps) {
    const { signOut } = useClerk();
    const router = useRouter();

    const [isLeavingDemo, setIsLeavingDemo] = useState<boolean>(false);

    if (!isOpen) {
        return null;
    }

    async function handleCreateAccount() {
        try {
            setIsLeavingDemo(true);

            await signOut();

            await router.push("/sign-up");
        } finally {
            setIsLeavingDemo(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-6 py-8">
            <div className="flex w-full max-w-md flex-col gap-6 rounded-2xl bg-white px-6 py-6 shadow-sm">
                <div className="flex flex-col gap-2">
                    <h5 className="font-semibold text-black">
                        Demo mode is read-only
                    </h5>

                    <p className="text-sm text-gray-600">
                        Create a free account to upload, rename, or delete your own reports.
                    </p>
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLeavingDemo}
                        className="rounded-md bg-gray-100 px-4 py-2 text-sm text-black transition-colors hover:bg-gray-200 disabled:opacity-50"
                    >
                        Close
                    </button>

                    <button
                        type="button"
                        onClick={handleCreateAccount}
                        disabled={isLeavingDemo}
                        className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600 disabled:opacity-50"
                    >
                        {isLeavingDemo
                            ? "Leaving Demo..."
                            : "Create Free Account"}
                    </button>
                </div>
            </div>
        </div>
    );
}