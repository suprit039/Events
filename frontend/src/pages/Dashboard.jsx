import React, { useEffect, useState } from "react";
import EventTable from "../components/EventTable";
import FilterBar from "../components/FilterBar";
import Navbar from "../components/Navbar";
import { fetchEvents, importEvent } from "../services/event.service";

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");
    const [status, setStatus] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const res = await fetchEvents();
                // Handle the API response structure: { success: true, count: X, events: [...] }
                setEvents(res.events || []);
            } catch (error) {
                console.error("Failed to load events");
                setEvents([]); // Set empty array on error
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

    const filteredEvents = Array.isArray(events) ? events.filter((event) => {
        const matchesKeyword = 
            event.title?.toLowerCase().includes(keyword.toLowerCase()) ||
            event.venueName?.toLowerCase().includes(keyword.toLowerCase());
        
        const matchesStatus = status ? event.status === status : true;
        
        return matchesKeyword && matchesStatus;
    }) : [];

    const handleImport = async (event) => {
        try {
            await importEvent(event._id, "Imported via dashboard");

            setEvents((prev) =>
                prev.map((e) =>
                    e._id === event._id
                        ? { ...e, status: "imported" }
                        : e
                )
            );
        } catch (error) {
            alert("Failed to import event");
        }
    };

    return (
        <>
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-4">
                    Admin Dashboard
                </h1>

                <FilterBar 
                    keyword={keyword} 
                    setKeyword={setKeyword}
                    status={status}
                    setStatus={setStatus}
                />

                {loading ? (
                    <p className="text-gray-500">Loading events...</p>
                ) : (
                    <EventTable
                        events={filteredEvents}
                        onSelect={setSelectedEvent}
                        onImport={handleImport}
                    />

                )}

                {/* Preview placeholder */}
                {selectedEvent && (
                    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                        <h2 className="text-lg font-semibold">
                            {selectedEvent.title}
                        </h2>
                        <p className="text-sm text-gray-600 mt-2">
                            {selectedEvent.description}
                        </p>
                    </div>
                )}
            </main>
        </>
    );
};

export default Dashboard;
