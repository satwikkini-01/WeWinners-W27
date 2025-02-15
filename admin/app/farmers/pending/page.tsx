"use client";

import BACKEND_URL from "../../../config";
import { useState, useEffect } from "react";

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

export default function PendingFarmers() {
  const [pendingFarmers, setPendingFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [actionType, setActionType] = useState("");

  useEffect(() => {
    async function fetchPendingFarmers() {
      try {
        const res = await fetch(`${BACKEND_URL}/farmers/pendingFarmers`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        if (Array.isArray(data.farmers)) {
          setPendingFarmers(data.farmers);
        } else {
          console.error("Invalid response format: Expected an array inside 'farmers'");
        }
      } catch (error) {
        console.error("Error fetching pending farmers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPendingFarmers();
  }, []);

  const confirmAction = (farmer: Farmer, action: string) => {
    setSelectedFarmer(farmer);
    setActionType(action);
    setModalOpen(true);
  };

  const handleAction = async () => {
    if (!selectedFarmer) return;
    try {
      const res = await fetch(`${BACKEND_URL}/farmers/approveFarmer`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: selectedFarmer.username }),
      });
      if (res.ok) {
        setPendingFarmers(pendingFarmers.filter((farmer) => farmer._id !== selectedFarmer._id));
      } else {
        console.error("Error updating farmer status");
      }
    } catch (error) {
      console.error("Error updating farmer status:", error);
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Pending Farmers</h1>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : pendingFarmers.length === 0 ? (
          <p className="text-gray-600 text-center">No Pending Farmers</p>
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
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingFarmers.map((farmer) => (
                <tr key={farmer._id} className="border-t">
                  <td className="p-3">{farmer.firstName} {farmer.lastName}</td>
                  <td className="p-3">{farmer.email}</td>
                  <td className="p-3">{farmer.phNumber}</td>
                  <td className="p-3">{farmer.kccId}</td>
                  <td className="p-3">{farmer.dob}</td>
                  <td className="p-3">{farmer.username}</td>
                  <td className="p-3 flex space-x-2">
                    <button
                      className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                      onClick={() => confirmAction(farmer, "approve")}
                    >
                      ✅ Approve
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      onClick={() => confirmAction(farmer, "deny")}
                    >
                      ❌ Deny
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                      onClick={() => confirmAction(farmer, "require-changes")}
                    >
                      ⚠ Require Changes
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && selectedFarmer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold">Confirm {actionType.replace("-", " ")}</h3>
            <p className="mt-2">Are you sure you want to {actionType.replace("-", " ")} {selectedFarmer.firstName} {selectedFarmer.lastName}?</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button onClick={handleAction} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Yes, Confirm
              </button>
              <button onClick={() => setModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
