import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome to the Admin Portal
                </h1>
                <p className="text-gray-600 mt-2">
                    Manage farmers and streamline operations effortlessly.
                </p>
                <div className="mt-6">
                    <Link
                        href="/farmers"
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
}
