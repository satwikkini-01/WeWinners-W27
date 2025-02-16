"use client";

import BACKEND_URL from "../../config";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Farmer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phNumber: string;
  kccId: string;
  dob: string;
  username: string;
  approved: boolean;
}

export default function ApprovedFarmers() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  // Ensure the component is only rendered after hydration
  useEffect(() => {
    setHydrated(true);
    async function fetchApprovedFarmers() {
      try {
        const res = await fetch(`${BACKEND_URL}/farmers/allFarmers`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        if (Array.isArray(data.farmers)) {
          setFarmers(data.farmers);
        } else {
          console.error("Invalid response format: Expected an array inside 'farmers'");
        }
      } catch (error) {
        console.error("Error fetching approved farmers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchApprovedFarmers();
  }, []);

  if (!hydrated) {
    return null; // Prevents hydration mismatch by rendering nothing initially
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Approved Farmers</h1>
          <Link
            href="/farmers/pending"
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
          >
            Manage Pending Farmers
          </Link>
        </div>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : farmers.length === 0 ? (
          <p className="text-gray-600 text-center">No Approved Farmers</p>
        ) : (
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3 text-left">Full Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone Number</th>
                <th className="p-3 text-left">KCC ID</th>
                <th className="p-3 text-left">Date of Birth</th>
                <th className="p-3 text-left">Username</th>
              </tr>
            </thead>
            <tbody>
              {farmers.map((farmer) => (
                <tr key={farmer._id} className="border-t">
                  <td className="p-3">{farmer.firstName} {farmer.lastName}</td>
                  <td className="p-3">{farmer.email}</td>
                  <td className="p-3">{farmer.phNumber}</td>
                  <td className="p-3">{farmer.kccId}</td>
                  <td className="p-3">{farmer.dob}</td>
                  <td className="p-3">{farmer.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
