import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    return (
        <nav className="fixed top-4 left-1/2 z-50 w-[90%] -translate-x-1/2 rounded-2xl bg-white px-4 py-4 shadow-md md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                {/* Left Side */}
                <div className="flex items-center justify-between gap-4 md:justify-start md:gap-8">
                    <div className="text-sm font-medium">
                        Logo + Site Name
                    </div>

                    <button className="text-sm text-gray-700 transition-colors hover:text-black">
                        Reports
                    </button>
                </div>

                {/* Right Side */}
                <div className="flex items-center justify-between gap-4 md:justify-start md:gap-6">
                    <div className="text-sm font-bold text-gray-700">
                        Username
                    </div>

                    <button className="flex items-center gap-4 text-md text-gray-700 transition-colors hover:text-black">
                        <FontAwesomeIcon icon={faGear} />
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>
                </div>

            </div>
        </nav>
    );
}