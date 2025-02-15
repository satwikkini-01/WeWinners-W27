"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import BACKEND_URL from "../../config";

export default function LoginPage() {
    const [farmerId, setFarmerId] = useState("");
    const [password, setPassword] = useState("");
    const [useOtp, setUseOtp] = useState(false);
    const [mobile, setMobile] = useState("");
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [errorMessage, setErrorMessage] = useState("");
    const otpInputs = useRef<Array<HTMLInputElement | null>>([]);
    const router = useRouter();

    const handleOtpChange = (index: number, value: string) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < 5) {
                otpInputs.current[index + 1]?.focus();
            }
        }
    };

    const handleOtpKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpInputs.current[index - 1]?.focus();
        }
    };

    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setMobile(value);
        }
    };

    const handleLogin = async () => {
        setErrorMessage("");
        try {
            const response = await fetch(`${BACKEND_URL}/farmers/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    useOtp
                        ? { mobile, otp: otp.join("") }
                        : { username: farmerId, password }
                ),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username)
                setToken(data.token);
                router.push("/home");
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-green-700">
                    Farmer Login
                </h2>
                <div className="mt-4">
                    {useOtp ? (
                        <>
                            <div>
                                <label className="block text-gray-700">Mobile Number</label>
                                <input
                                    type="text"
                                    value={mobile}
                                    onChange={handleMobileChange}
                                    maxLength={10}
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                />
                            </div>
                            <div className="flex justify-center space-x-2 mt-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) =>
                                            (otpInputs.current[index] = el)
                                        }
                                        type="text"
                                        value={digit}
                                        maxLength={1}
                                        onChange={(e) =>
                                            handleOtpChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        onKeyDown={(e) =>
                                            handleOtpKeyDown(index, e)
                                        }
                                        className="w-10 h-10 border-b-2 border-gray-500 text-center text-lg"
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-gray-700">Farmer ID</label>
                                <input
                                    type="text"
                                    value={farmerId}
                                    onChange={(e) => setFarmerId(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded mt-2"
                                />
                            </div>
                        </>
                    )}
                    {errorMessage && (
                        <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
                    )}
                    <button
                        onClick={handleLogin}
                        className={`w-full p-2 rounded mt-4 ${
                            useOtp && otp.join(" ").length < 6
                                ? "bg-gray-400"
                                : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                        disabled={useOtp && otp.join(" ").length < 6}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setUseOtp(!useOtp)}
                        className="w-full bg-gray-200 text-green-700 p-2 rounded mt-2 hover:bg-gray-300"
                    >
                        {useOtp ? "Use Password Instead" : "Login via OTP"}
                    </button>
                </div>
                <p className="text-center mt-4 text-gray-600">
                    New to our website? {" "}
                    <a
                        href="/register"
                        className="text-green-700 font-semibold"
                    >
                        Register Now
                    </a>
                </p>
            </div>
        </div>
    );
}
