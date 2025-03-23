"use client";

import { useEffect, useState } from "react";
import { db } from "@/app/lib/firebaseConfig";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { FaTrashAlt, FaEdit, FaPlus, FaSave, FaChevronRight, FaCalendarAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<any>(null);

  // ✅ Event Form State
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  // ✅ Fetch Events from Firestore
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventList);
    } catch (error) {
      console.error("Error fetching events:", error);
      setError("Failed to load events.");
    }
    setLoading(false);
  };

  // ✅ Add New Event
  const handleAddEvent = async () => {
    if (!title || !date || !time || !location || !description || !imageUrl) {
      toast.error(<><FaExclamationCircle /> Please fill in all fields.</>);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "events"), {
        title,
        date,
        time,
        location,
        description,
        imageUrl,
      });

      setEvents([...events, { id: docRef.id, title, date, time, location, description, imageUrl }]);
      toast.success(<><FaCheckCircle /> Event added successfully.</>);

      resetForm();
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error(<><FaExclamationCircle /> Failed to add event.</>);
    }
  };

  // ✅ Edit Event
  const handleEditEvent = (event: any) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDate(event.date);
    setTime(event.time);
    setLocation(event.location);
    setDescription(event.description);
    setImageUrl(event.imageUrl);
  };

  const handleSaveEdit = async () => {
    if (!editingEvent) return;

    try {
      const eventRef = doc(db, "events", editingEvent.id);
      await updateDoc(eventRef, {
        title,
        date,
        time,
        location,
        description,
        imageUrl,
      });

      setEvents(events.map((e) => (e.id === editingEvent.id ? { ...e, title, date, time, location, description, imageUrl } : e)));
      toast.success(<><FaCheckCircle /> Event updated successfully.</>);

      resetForm();
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error(<><FaExclamationCircle /> Failed to update event.</>);
    }
  };

  // ✅ Delete Event
  const handleDeleteEvent = async (eventId: string) => {
    try {
      const eventRef = doc(db, "events", eventId);
      await deleteDoc(eventRef);

      setEvents(events.filter((e) => e.id !== eventId));
      toast.success(<><FaCheckCircle /> Event deleted successfully.</>);
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error(<><FaExclamationCircle /> Failed to delete event.</>);
    }
  };

  // ✅ Reset Form
  const resetForm = () => {
    setTitle("");
    setDate("");
    setTime("");
    setLocation("");
    setDescription("");
    setImageUrl("");
    setEditingEvent(null);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-6xl mx-auto">
      <ToastContainer />

      {/* ✅ Breadcrumb Navigation */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/admin/dashboard" className="hover:text-primary">
          Dashboard
        </Link>{" "}
        <FaChevronRight className="inline-block mx-1" /> Manage Events
      </nav>

      <h2 className="text-3xl font-bold text-primary mb-6 flex items-center">
        <FaCalendarAlt className="mr-2" /> Manage Events
      </h2>

      {/* ✅ Add/Edit Event Form */}
      <div className="mb-6 p-6 bg-lightBg rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">{editingEvent ? "Edit Event" : "Add New Event"}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded-lg" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-3 border rounded-lg" />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-3 border rounded-lg" />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border rounded-lg" />
          <input type="text" placeholder="Paste Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full p-3 border rounded-lg" />
        </div>
        <button onClick={editingEvent ? handleSaveEdit : handleAddEvent} className="mt-4 px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-500 transition">
          {editingEvent ? <FaSave className="inline-block mr-2" /> : <FaPlus className="inline-block mr-2" />}
          {editingEvent ? "Save Changes" : "Add Event"}
        </button>
      </div>

      {/* ✅ Fully Responsive Event List */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{event.title}</td>
                <td className="p-3">{event.date}</td>
                <td className="p-3">{event.location}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button onClick={() => handleEditEvent(event)} className="text-yellow-600 hover:text-yellow-800">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDeleteEvent(event.id)} className="text-red-600 hover:text-red-800">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEvents;