import Link from "next/link";

type DemoModeModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function DemoModeModal({
    isOpen,
    onClose,
}: DemoModeModalProps) {
    if (!isOpen) {
        return null;
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
                        className="rounded-md bg-gray-100 px-4 py-2 text-sm text-black"
                    >
                        Close
                    </button>

                    <Link
                        href="/sign-up"
                        className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white"
                    >
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
}