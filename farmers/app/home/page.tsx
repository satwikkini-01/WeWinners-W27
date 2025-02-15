"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BACKEND_URL from "@/config";

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
}

export default function FarmerHomePage() {
    const router = useRouter();
    const [salesStats, setSalesStats] = useState({
        totalSales: 0,
        totalOrders: 0,
        pendingOrders: 0,
    });
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // const statsResponse = await fetch("/api/sales-stats");
                // const statsData = await statsResponse.json();
                // setSalesStats(statsData);

                const productsResponse = await fetch(`${BACKEND_URL}/users/products`);
                const productsData = await productsResponse.json();
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-green-100 flex flex-col">
            {/* Navbar */}
            <nav className="bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-green-700">
                    Farmer Dashboard
                </h1>
                <ul className="flex space-x-6 text-green-700">
                    <li className="cursor-pointer">Home</li>
                    <li className="cursor-pointer">Orders</li>
                    <li className="cursor-pointer">Inventory</li>
                    <li className="cursor-pointer">Payments</li>
                    <li className="cursor-pointer">Support</li>
                </ul>
            </nav>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {loading ? (
                    <p className="text-center text-green-700">Loading...</p>
                ) : (
                    <>
                        {/* Sales Statistics */}
                        <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                            <h2 className="text-xl font-semibold text-green-700 mb-4">
                                Sales Statistics
                            </h2>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="p-4 bg-green-200 rounded-lg">
                                    <h3 className="text-lg font-bold">
                                        Total Sales
                                    </h3>
                                    <p className="text-xl">
                                        ₹{salesStats.totalSales}
                                    </p>
                                </div>
                                <div className="p-4 bg-green-200 rounded-lg">
                                    <h3 className="text-lg font-bold">
                                        Total Orders
                                    </h3>
                                    <p className="text-xl">
                                        {salesStats.totalOrders}
                                    </p>
                                </div>
                                <div className="p-4 bg-green-200 rounded-lg">
                                    <h3 className="text-lg font-bold">
                                        Pending Orders
                                    </h3>
                                    <p className="text-xl">
                                        {salesStats.pendingOrders}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Products Section */}
                        <section className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-green-700">
                                    Your Products
                                </h2>
                                <button
                                    onClick={() => router.push("/home/add")}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                >
                                    Add Product
                                </button>
                            </div>
                            {products.length === 0 ? (
                                <p className="text-center text-gray-600">
                                    No products available
                                </p>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    {products.map((product) => (
                                        <div
                                            key={product.id}
                                            className="p-4 bg-green-50 rounded-lg shadow"
                                        >
                                            <h3 className="text-lg font-bold text-green-700">
                                                {product.name}
                                            </h3>
                                            <p className="text-gray-600">
                                                Stock: {product.stock}
                                            </p>
                                            <p className="text-gray-600">
                                                Price: ₹{product.price}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white text-center p-4 shadow-md mt-6">
                <p className="text-green-700">
                    &copy; 2025 Farmer Marketplace. All Rights Reserved.
                </p>
            </footer>
        </div>
    );
}
