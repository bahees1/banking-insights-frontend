import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faBolt } from "@fortawesome/free-solid-svg-icons";
import { Show, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
    const { user } = useUser();

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="fixed top-4 left-1/2 z-50 hidden w-[90%] max-w-7xl -translate-x-1/2 rounded-2xl bg-white px-6 py-2 shadow-md md:block">
                <div className="flex min-w-0 items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-4">
                        <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-blue-600">
                            <FontAwesomeIcon icon={faBolt} className="shrink-0" />

                            <span className="truncate">
                                Personal Spending Insights
                            </span>
                        </div>

                        <Show when="signed-in">
                            <Link
                                href="/reports"
                                className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                            >
                                Reports
                            </Link>
                        </Show>
                    </div>

                    <div className="flex items-center gap-3">
                        <Show when="signed-out">
                            <Link
                                href="/sign-in"
                                className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                            >
                                Sign In
                            </Link>

                            <Link
                                href="/sign-up"
                                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
                            >
                                Sign Up
                            </Link>
                        </Show>

                        <Show when="signed-in">
                            <span className="text-sm font-medium text-gray-700">
                                {user?.firstName}
                            </span>

                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "h-10 w-10",
                                    },
                                }}
                            />
                        </Show>
                    </div>
                </div>
            </nav>

            {/* Mobile Navbar */}
            <nav className="fixed top-4 left-1/2 z-50 block w-[90%] max-w-7xl -translate-x-1/2 rounded-2xl bg-white px-4 py-4 shadow-md md:hidden">
                <div className="flex min-w-0 items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-blue-600">
                        <FontAwesomeIcon icon={faBolt} className="shrink-0" />

                        <span className="truncate">
                            Personal Spending Insights
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Show when="signed-in">
                            <Menu as="div" className="relative">
                                <MenuButton className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100">
                                    <FontAwesomeIcon icon={faGear} />
                                </MenuButton>

                                <MenuItems
                                    transition
                                    className="absolute right-0 mt-4 w-48 origin-top-right rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5 transition duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                                >
                                    <MenuItem>
                                        <Link
                                            href="/reports"
                                            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100"
                                        >
                                            Reports
                                        </Link>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>

                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "h-10 w-10",
                                    },
                                }}
                            />
                        </Show>

                        <Show when="signed-out">
                            <Link
                                href="/sign-in"
                                className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                            >
                                Sign In
                            </Link>
                        </Show>
                    </div>
                </div>
            </nav>
        </>
    );
}