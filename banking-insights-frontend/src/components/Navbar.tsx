import {Menu,MenuButton,MenuItem,MenuItems} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars, faBolt} from "@fortawesome/free-solid-svg-icons";
import {Show, UserButton, useUser} from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/router";
import DemoUserMenu from "@/components/DemoUserMenu";
import { useDemoMode } from "@/hooks/useDemoMode";

export default function Navbar() {
    const router = useRouter();
    const { user } = useUser();
    const { isDemoUser } = useDemoMode();

    const reportsIsActive =
        router.pathname === "/reports"
        || router.pathname === "/reports/[reportId]";

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="fixed top-4 left-1/2 z-50 hidden w-[90%] max-w-7xl -translate-x-1/2 rounded-2xl bg-white px-6 py-2 shadow-md md:block">
                <div className="flex min-w-0 items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-5">
                       {user ? (
                            <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-blue-600">
                                <span className="truncate cursor-default">
                                    Personal Spending Insights
                                </span>
                            </div>
                        ) : (
                            <Link
                                href="/"
                                className="flex min-w-0 items-center gap-2 text-sm font-medium text-blue-600"
                            >
                                <span className="truncate">
                                    Personal Spending Insights
                                </span>
                            </Link>
                        )}

                        <Show when="signed-in">
                            <Link
                                href="/reports"
                                className={`
                                    shrink-0
                                    rounded-lg
                                    px-4
                                    py-2
                                    text-sm
                                    font-semibold
                                    transition-colors
                                    ${
                                        reportsIsActive
                                            ? "bg-blue-50 text-blue-600"
                                            : "text-gray-700 hover:bg-gray-100"
                                    }
                                `}
                            >
                                Reports
                            </Link>
                        </Show>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                        <Show when="signed-out">
                            <Link
                                href="/sign-in"
                                className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
                            >
                                Sign In
                            </Link>

                            <Link
                                href="/demo"
                                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200"
                            >
                                Explore Demo
                            </Link>

                            <Link
                                href="/sign-up"
                                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
                            >
                                Sign Up
                            </Link>
                        </Show>

                        <Show when="signed-in">
                            <span className="max-w-[160px] truncate text-sm font-medium text-gray-700">
                                {isDemoUser
                                    ? "Demo User"
                                    : user?.firstName ?? "Account"}
                            </span>

                            {isDemoUser ? (
                                <DemoUserMenu />
                            ) : (
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: "h-10 w-10",
                                        },
                                    }}
                                />
                            )}
                        </Show>
                    </div>
                </div>
            </nav>

            {/* Mobile Navbar */}
            <nav className="fixed top-4 left-1/2 z-50 block w-[90%] max-w-7xl -translate-x-1/2 rounded-2xl bg-white px-4 py-4 shadow-md md:hidden">
                <div className="flex min-w-0 items-center justify-between gap-4">
                    {user ? (
                        <div className="flex min-w-0 items-center gap-2 text-sm font-medium text-blue-600">
                            <FontAwesomeIcon
                                icon={faBolt}
                                className="shrink-0"
                            />

                            <span className="truncate cursor-default">
                                Personal Spending Insights
                            </span>
                        </div>
                    ) : (
                        <Link
                            href="/"
                            className="flex min-w-0 items-center gap-2 text-sm font-medium text-blue-600"
                        >
                            <FontAwesomeIcon
                                icon={faBolt}
                                className="shrink-0"
                            />

                            <span className="truncate">
                                Personal Spending Insights
                            </span>
                        </Link>
                    )}

                    <div className="flex shrink-0 items-center gap-3">
                        <Show when="signed-in">
                            <Menu as="div" className="relative">
                                <MenuButton className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100">
                                    <FontAwesomeIcon icon={faBars} />
                                </MenuButton>

                                <MenuItems
                                    transition
                                    className="absolute right-0 mt-4 w-48 origin-top-right rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5 transition duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                                >
                                    <MenuItem>
                                        <Link
                                            href="/reports"
                                            className={`
                                                block
                                                w-full
                                                rounded-lg
                                                px-3
                                                py-2
                                                text-left
                                                text-sm
                                                data-[focus]:bg-gray-100
                                                ${
                                                    reportsIsActive
                                                        ? "font-semibold text-blue-600"
                                                        : "text-gray-700"
                                                }
                                            `}
                                        >
                                            Reports
                                        </Link>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>

                            {isDemoUser ? (
                                <DemoUserMenu />
                            ) : (
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: "h-10 w-10",
                                        },
                                    }}
                                />
                            )}
                        </Show>

                        <Show when="signed-out">
                            <Menu as="div" className="relative">
                                <MenuButton className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100">
                                    <FontAwesomeIcon icon={faBars} />
                                </MenuButton>

                                <MenuItems
                                    transition
                                    className="absolute right-0 mt-4 w-52 origin-top-right rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5 transition duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                                >
                                    <MenuItem>
                                        <Link
                                            href="/demo"
                                            className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-blue-600 data-[focus]:bg-gray-100"
                                        >
                                            Explore Demo
                                        </Link>
                                    </MenuItem>

                                    <MenuItem>
                                        <Link
                                            href="/sign-in"
                                            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100"
                                        >
                                            Sign In
                                        </Link>
                                    </MenuItem>

                                    <MenuItem>
                                        <Link
                                            href="/sign-up"
                                            className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-gray-700 data-[focus]:bg-gray-100"
                                        >
                                            Create Account
                                        </Link>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </Show>
                    </div>
                </div>
            </nav>
        </>
    );
}