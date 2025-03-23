"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { FaUsers, FaTrashAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Dialog } from "@headlessui/react";

interface Volunteer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  message: string;
  submittedAt?: any;
  emailSent?: boolean;
}

const VolunteersPage = () => {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "volunteers"));
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Volunteer[];

        setVolunteers(list);
      } catch (error) {
        console.error("Error loading volunteers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  const confirmDelete = (id: string) => {
    setDeletingId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteDoc(doc(db, "volunteers", deletingId));
      setVolunteers((prev) => prev.filter((v) => v.id !== deletingId));
      setIsModalOpen(false);
      setDeletingId(null);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <main className="p-8">
      {/* ✅ Breadcrumb */}
      <nav className="mb-6 text-gray-600 text-sm">
        <Link href="/admin/dashboard" className="hover:text-primary">Dashboard</Link> / <span className="text-gray-400">Volunteers</span>
      </nav>

      {/* ✅ Header */}
      <h1 className="text-3xl font-bold text-primary mb-8 flex items-center gap-3">
        <FaUsers /> Volunteers
      </h1>

      {loading ? (
        <p className="text-primary text-lg">Loading...</p>
      ) : volunteers.length === 0 ? (
        <p className="text-gray-500 italic">No volunteer submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-xl shadow-md">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Email Sent</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((v) => (
                <tr key={v.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{v.fullName}</td>
                  <td className="px-4 py-2">{v.email}</td>
                  <td className="px-4 py-2">{v.phone}</td>
                  <td className="px-4 py-2">{v.role}</td>
                  <td className="px-4 py-2">
                    {v.emailSent ? (
                      <span className="text-green-600 flex items-center gap-1">
                        <FaCheckCircle /> Sent
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center gap-1">
                        <FaTimesCircle /> Failed
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button onClick={() => confirmDelete(v.id)} className="text-red-600 hover:text-red-800 transition" aria-label="Delete">
                      <FaTrashAlt size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Delete Confirmation Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen bg-black/30 p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <Dialog.Title className="text-lg font-semibold text-gray-800">
              Delete Volunteer?
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500 mt-1">
              Are you sure you want to delete this volunteer? This action cannot be undone.
            </Dialog.Description>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">Delete</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </main>
  );
};

export default VolunteersPage;