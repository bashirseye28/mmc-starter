"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";
import { FaEnvelope, FaTrashAlt } from "react-icons/fa";
import { Dialog } from "@headlessui/react";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt?: any;
}

const ContactMessagesPage = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const snapshot = await getDocs(collection(db, "messages"));
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ContactMessage[];

        setMessages(list);
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const confirmDelete = (id: string) => {
    setDeletingId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    try {
      await deleteDoc(doc(db, "messages", deletingId));
      setMessages((prev) => prev.filter((m) => m.id !== deletingId));
      setIsModalOpen(false);
      setDeletingId(null);
    } catch (error) {
      console.error("Failed to delete message:", error);
    }
  };

  return (
    <main className="p-8">
      {/* ✅ Breadcrumb */}
      <nav className="mb-6 text-gray-600 text-sm">
        <Link href="/admin/dashboard" className="hover:text-primary">
          Dashboard
        </Link>{" "}
        / <span className="text-gray-400">Messages</span>
      </nav>

      {/* ✅ Page Title */}
      <h1 className="text-3xl font-bold text-primary mb-8 flex items-center gap-3">
        <FaEnvelope /> Messages
      </h1>

      {/* ✅ Table */}
      {loading ? (
        <div className="text-primary text-lg">Loading...</div>
      ) : messages.length === 0 ? (
        <p className="text-gray-500 italic">No contact messages yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-xl shadow-md">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{m.name}</td>
                  <td className="px-4 py-2">{m.email}</td>
                  <td className="px-4 py-2">{m.phone || "-"}</td>
                  <td className="px-4 py-2 max-w-xs truncate">{m.message}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => confirmDelete(m.id)}
                      className="text-red-600 hover:text-red-800 transition"
                      aria-label="Delete message"
                    >
                      <FaTrashAlt size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Confirmation Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed z-50 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen bg-black/30 p-4">
          <Dialog.Panel className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <Dialog.Title className="text-lg font-semibold text-gray-800">
              Delete Message?
            </Dialog.Title>
            <Dialog.Description className="text-sm text-gray-500 mt-1">
              This will permanently remove the contact message from the database.
            </Dialog.Description>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </main>
  );
};

export default ContactMessagesPage;