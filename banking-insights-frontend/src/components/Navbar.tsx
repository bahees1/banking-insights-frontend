import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSignOutAlt, faBolt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Navbar() {
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

                        <Link
                            href="/reports"
                            className="shrink-0 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                        >
                            Reports
                        </Link>
                    </div>

                    <div className="flex min-w-0 shrink items-center justify-end gap-3">
                        <div className="min-w-0 max-w-[180px] truncate text-sm font-bold text-gray-400 lg:max-w-[260px]">
                            UsernameUsernameUsername
                        </div>

                        <div className="flex shrink-0 items-center">
                            <button className="rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100">
                                <FontAwesomeIcon icon={faGear} />
                            </button>

                            <button className="rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100">
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </button>
                        </div>
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

                    <Menu as="div" className="relative shrink-0">
                        <MenuButton className="text-gray-700 transition-colors hover:text-black focus:outline-none focus:ring-0">
                            <FontAwesomeIcon icon={faGear} />
                        </MenuButton>

                        <MenuItems
                            transition
                            className="absolute right-0 mt-4 w-48 origin-top-right rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5 transition duration-150 ease-out focus:outline-none focus:ring-0 data-[closed]:scale-95 data-[closed]:opacity-0"
                        >
                            <MenuItem>
                                <Link
                                    href="/reports"
                                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 focus:outline-none focus:ring-0 data-[focus]:bg-gray-100"
                                >
                                    Reports
                                </Link>
                            </MenuItem>

                            <MenuItem>
                                <div className="block w-full truncate rounded-lg px-3 py-2 text-left text-sm font-bold text-gray-700 focus:outline-none focus:ring-0 data-[focus]:bg-gray-100">
                                    UsernameUsernameUsername
                                </div>
                            </MenuItem>

                            <MenuItem>
                                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-gray-700 focus:outline-none focus:ring-0 data-[focus]:bg-gray-100">
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                    Sign out
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
            </nav>
        </>
    );
}