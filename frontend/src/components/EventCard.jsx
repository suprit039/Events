import React from "react";


const EventCard = ({ event, onGetTickets }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition flex flex-col">
      {/* Image */}
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-48 w-full object-cover rounded-t-xl"
        />
      )}

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {event.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {new Date(event.dateTime).toLocaleString()}
        </p>

        {event.venueName && (
          <p className="text-sm text-gray-700 mt-1">
            📍 {event.venueName}
          </p>
        )}

        <p className="text-sm text-gray-600 mt-3 line-clamp-3">
          {event.description || "No description available."}
        </p>

        {/* CTA */}
        <button
          onClick={() => onGetTickets(event)}
          className="mt-auto bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition"
        >
          GET TICKETS
        </button>
      </div>
    </div>
  );
};

export default EventCard;
