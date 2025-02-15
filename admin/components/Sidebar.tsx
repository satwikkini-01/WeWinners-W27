import Link from "next/link";

function Sidebar() {
    return (
        <aside className="w-64 bg-gray-900 text-white p-4">
            <nav className="mt-4">
                <ul>
                    <li>
                        <Link
                            href="/farmers"
                            className="block py-2 px-4 hover:bg-gray-700"
                        >
                            Farmers
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
