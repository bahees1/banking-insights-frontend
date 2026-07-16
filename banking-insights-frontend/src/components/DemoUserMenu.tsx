import { useState } from "react";
import {Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function DemoUserMenu() {
    const router = useRouter();
    const { signOut } = useClerk();
    const { user } = useUser();

    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    async function handleSignOut() {
        try {
            setIsProcessing(true);

            await signOut();

            await router.push("/");
        } finally {
            setIsProcessing(false);
        }
    }

    async function handleCreateAccount() {
        try {
            setIsProcessing(true);

            await signOut();

            await router.push("/sign-up");
        } finally {
            setIsProcessing(false);
        }
    }

    const firstInitial =
        user?.firstName?.charAt(0).toUpperCase() ?? "D";

    return (
        <Menu as="div" className="relative shrink-0">
            <MenuButton
                type="button"
                aria-label="Open demo account menu"
                disabled={isProcessing}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-blue-500 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {user?.imageUrl ? (
                    <img
                        src={user.imageUrl}
                        alt="Demo user"
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <span>{firstInitial}</span>
                )}
            </MenuButton>

            <MenuItems
                transition
                anchor="bottom end"
                className="z-[60] mt-3 w-64 origin-top-right rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5 transition duration-150 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
                <div className="border-b border-gray-100 px-3 py-3">
                    <p className="text-sm font-semibold text-black">
                        Demo User
                    </p>

                    <p className="pt-1 text-xs text-gray-500">
                        Read-only demonstration account
                    </p>
                </div>

                <div className="flex flex-col gap-1 pt-2">
                    <MenuItem>
                        <button
                            type="button"
                            onClick={handleCreateAccount}
                            disabled={isProcessing}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-blue-600 transition-colors data-[focus]:bg-blue-50 disabled:opacity-50"
                        >
                            <FontAwesomeIcon
                                icon={faUserPlus}
                                className="w-4 shrink-0"
                            />

                            Create Free Account
                        </button>
                    </MenuItem>

                    <MenuItem>
                        <button
                            type="button"
                            onClick={handleSignOut}
                            disabled={isProcessing}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-gray-700 transition-colors data-[focus]:bg-gray-100 disabled:opacity-50"
                        >
                            <FontAwesomeIcon
                                icon={faArrowRightFromBracket}
                                className="w-4 shrink-0"
                            />

                            {isProcessing ? "Please wait..." : "Sign Out"}
                        </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    );
}