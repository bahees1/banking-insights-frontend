export default function Navbar() {
    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] bg-white shadow-md rounded-2xl px-6 py-4">
            <div className="flex items-center justify-between">

                {/* Left Side */}
                <div className="flex items-center gap-8">
                    <div className="text-sm font-medium">
                        Logo + Site Name
                    </div>

                    <button className="text-sm text-gray-700 hover:text-black transition-colors">
                        Reports
                    </button>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-6">
                    <div className="text-sm text-gray-700">
                        Username
                    </div>

                    <button className="text-sm text-gray-700 hover:text-black transition-colors">
                        Settings/Log out
                    </button>
                </div>

            </div>
        </nav>
    );
}