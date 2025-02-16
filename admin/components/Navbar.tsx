import Link from "next/link";

function Navbar() {
    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <Link
                href="/farmers/add"
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                + Add Farmer
            </Link>
        </nav>
    );
}

export default Navbar;
