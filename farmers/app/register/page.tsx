"use client";

import BACKEND_URL from "../../config";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegistrationPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        phNumber: "",
        email: "",
        kccId: "",
        dob: "",
        password: "",
        confirmPassword: "",
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usernames, setUsernames] = useState<string[]>([]);
    const [usernameMessage, setUsernameMessage] = useState(
        "Username must be unique"
    );
    const [isUsernameUnique, setIsUsernameUnique] = useState(true);
    const router = useRouter();

    // Fetch usernames from backend and ensure it's an array
    useEffect(() => {
        async function fetchUsernames() {
            try {
                const response = await fetch(
                    `${BACKEND_URL}/allfarmersUsername`
                );
                if (!response.ok)
                    throw new Error(`HTTP error! Status: ${response.status}`);

                const data = await response.json();

                // Extract usernames from the "farmers" key
                let usernameList = [];
                if (data.farmers && Array.isArray(data.farmers)) {
                    usernameList = data.farmers.map(
                        (farmer) => farmer.username
                    );
                } else {
                    throw new Error(
                        "Invalid response format: expected an array inside 'farmers'."
                    );
                }

                setUsernames(usernameList);
                localStorage.setItem("usernames", JSON.stringify(usernameList));
            } catch (error) {
                console.error("Error fetching usernames:", error);
            }
        }
        fetchUsernames();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Check username uniqueness
        if (name === "username") {
            if (usernames.length > 0 && usernames.includes(value)) {
                setUsernameMessage("Username is not unique");
                setIsUsernameUnique(false);
            } else {
                setUsernameMessage("Username is unique");
                setIsUsernameUnique(true);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isUsernameUnique || formData.password !== formData.confirmPassword)
            return;

        try {
            const response = await fetch(`${BACKEND_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        router.push("/");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-green-700">
                    Farmer Registration
                </h2>
                <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-gray-700">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        <p
                            className={`text-sm ${
                                isUsernameUnique
                                    ? "text-green-600"
                                    : "text-red-600"
                            }`}
                        >
                            {usernameMessage}
                        </p>
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phNumber"
                            value={formData.phNumber}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            KCC ID
                        </label>
                        <input
                            type="kccId"
                            name="kccId"
                            value={formData.kccId}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            Date Of Birth
                        </label>
                        <input
                            type="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">
                            Re-enter Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                        {formData.password !== formData.confirmPassword && (
                            <p className="text-red-600 text-sm">
                                Passwords do not match
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={
                            !isUsernameUnique ||
                            formData.password !== formData.confirmPassword
                        }
                        className={`w-full p-2 rounded ${
                            isUsernameUnique &&
                            formData.password === formData.confirmPassword
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-gray-400 text-gray-700 cursor-not-allowed"
                        }`}
                    >
                        Register
                    </button>
                    <p className="text-center mt-4 text-gray-600">
                        Already a user?{" "}
                        <a
                            href="/login"
                            className="text-green-700 font-semibold"
                        >
                            Sign In
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
