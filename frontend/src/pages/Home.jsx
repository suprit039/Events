
import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";
import TicketModal from "../components/TicketModal";
import { fetchEvents, saveLead } from "../services/event.service";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch events on page load
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        // Handle the API response structure: { success: true, count: X, events: [...] }
        setEvents(data.events || []);
      } catch (error) {
        console.error("Failed to fetch events", error);
        setEvents([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Open modal
  const handleGetTickets = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  // Submit email + consent
  const handleSubmitLead = async ({ email, consent }) => {
    try {
      await saveLead({
        email,
        consent,
        eventId: selectedEvent._id,
      });

      // Redirect to original event site
      window.location.href = selectedEvent.originalEventUrl;
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsModalOpen(false);
      setSelectedEvent(null);
    }
  };

  // Filter events based on search
  const filteredEvents = Array.isArray(events) ? events.filter((event) => {
    if (!searchKeyword.trim()) return true;
    
    const keyword = searchKeyword.toLowerCase();
    return (
      event.title?.toLowerCase().includes(keyword) ||
      event.venueName?.toLowerCase().includes(keyword) ||
      event.description?.toLowerCase().includes(keyword)
    );
  }) : [];

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-2xl font-bold mb-4 sm:mb-0">
            Upcoming Events in Sydney
          </h2>
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg 
                className="h-5 w-5 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search events..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="border border-gray-300 pl-10 pr-4 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg 
                  className="h-4 w-4 text-gray-400 hover:text-gray-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500">Loading events...</p>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {searchKeyword ? `No events found for "${searchKeyword}"` : "No events found."}
            </p>
            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword("")}
                className="mt-2 text-blue-500 hover:text-blue-700 underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onGetTickets={handleGetTickets}
              />
            ))}
          </div>
        )}
      </main>

      {/* Ticket Modal */}
      <TicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitLead}
      />
    </>
  );
};

export default Home;
