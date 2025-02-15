"use client";

import { useState, useEffect } from "react";

interface Farmer {
  id: number;
  name: string;
  location: string;
  contact: string;
  email: string;
  cropDetails: string;
  approved: boolean;
}

export default function PendingFarmers() {
  const [pendingFarmers, setPendingFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/farmers/pending")
      .then((res) => res.json())
      .then((data) => {
        setPendingFarmers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function updateFarmerStatus(id: number, status: string) {
    await fetch(`/api/farmers/${id}/${status}`, { method: "POST" });
    setPendingFarmers(pendingFarmers.filter(farmer => farmer.id !== id));
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Pending Farmers</h1>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : pendingFarmers.length === 0 ? (
          <p className="text-gray-600">No Pending Farmers</p>
        ) : (
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Name</th>
                <th className="p-2">Location</th>
                <th className="p-2">Contact</th>
                <th className="p-2">Email</th>
                <th className="p-2">Crop Details</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingFarmers.map((farmer) => (
                <tr key={farmer.id} className="border-t">
                  <td className="p-2">{farmer.name}</td>
                  <td className="p-2">{farmer.location}</td>
                  <td className="p-2">{farmer.contact}</td>
                  <td className="p-2">{farmer.email}</td>
                  <td className="p-2">{farmer.cropDetails}</td>
                  <td className="p-2 flex space-x-2">
                    <button 
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                      onClick={() => updateFarmerStatus(farmer.id, "approve")}
                    >
                      Approve
                    </button>
                    <button 
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      onClick={() => updateFarmerStatus(farmer.id, "deny")}
                    >
                      Deny
                    </button>
                    <button 
                      className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                      onClick={() => updateFarmerStatus(farmer.id, "require-changes")}
                    >
                      Require Changes
                    </button>
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
