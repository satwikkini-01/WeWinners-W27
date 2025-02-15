"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Farmer {
  id: number;
  name: string;
  location: string;
  contact: string;
  approved: boolean;
}

export default function Farmers() {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/farmers")
      .then((res) => res.json())
      .then((data) => {
        setFarmers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function approveFarmer(id: number) {
    await fetch(`/api/farmers/${id}/approve`, { method: "POST" });
    setFarmers(farmers.map(farmer => 
      farmer.id === id ? { ...farmer, approved: true } : farmer
    ));
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Farmers List</h1>
          <Link
            href="/farmers/pending"
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
          >
            Approve Farmers
          </Link>
        </div>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : farmers.length === 0 ? (
          <p className="text-gray-600">No Farmers Available</p>
        ) : (
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Name</th>
                <th className="p-2">Location</th>
                <th className="p-2">Contact</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {farmers.map((farmer) => (
                <tr key={farmer.id} className="border-t">
                  <td className="p-2">{farmer.name}</td>
                  <td className="p-2">{farmer.location}</td>
                  <td className="p-2">{farmer.contact}</td>
                  <td className="p-2">
                    {farmer.approved ? (
                      <span className="text-green-600">Approved</span>
                    ) : (
                      <button 
                        className="text-yellow-500 hover:underline" 
                        onClick={() => approveFarmer(farmer.id)}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                  <td className="p-2">
                    <Link href={`/farmers/${farmer.id}`} className="text-blue-500 hover:underline">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
