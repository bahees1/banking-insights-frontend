import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    return (
        <>
            {/* Desktop Navbar */}
            <nav className="fixed top-4 left-1/2 z-50 hidden w-[90%] min-w-[400px] max-w-[1400px] -translate-x-1/2 rounded-2xl bg-white px-6 py-4 shadow-md min-[500px]:block">
                <div className="flex min-w-[400px] flex-nowrap items-center justify-between gap-8">
                    <div className="flex shrink-0 items-center gap-8">
                        <div className="whitespace-nowrap text-sm font-medium">
                            Logo + Site Name
                        </div>

                        <button className="whitespace-nowrap text-sm text-gray-700 transition-colors hover:text-black">
                            Reports
                        </button>
                    </div>

                    <div className="flex shrink-0 items-center gap-6">
                        <div className="whitespace-nowrap text-sm font-bold text-gray-700">
                            Username
                        </div>

                        <button className="flex shrink-0 items-center gap-4 text-md text-gray-700 transition-colors hover:text-black">
                            <FontAwesomeIcon icon={faGear} />
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navbar */}
            <nav className="fixed top-4 left-1/2 z-50 block w-[90%] min-w-[320px] -translate-x-1/2 rounded-2xl bg-white px-4 py-4 shadow-md min-[500px]:hidden">
                <div className="flex items-center justify-between">
                    <div className="whitespace-nowrap text-sm font-medium">
                        Logo + Site Name
                    </div>

                    <Menu as="div" className="relative">
                        <MenuButton className="text-gray-700 transition-colors hover:text-black focus:outline-none focus:ring-0">
                        <FontAwesomeIcon icon={faGear} />
                    </MenuButton>

                    <MenuItems
                        transition
                        className="absolute right-0 mt-4 w-48 origin-top-right rounded-xl bg-white p-2 shadow-lg ring-1 ring-black/5 transition duration-150 ease-out focus:outline-none focus:ring-0 data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                            <MenuItem>
                                <button className="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 focus:outline-none focus:ring-0 data-[focus]:bg-gray-100">
                                    Reports
                                </button>
                            </MenuItem>

                            <MenuItem>
                                <div className="block w-full rounded-lg px-3 py-2 text-left text-sm font-bold text-gray-700 focus:outline-none focus:ring-0 data-[focus]:bg-gray-100">
                                    Username
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