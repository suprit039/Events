import React from "react";


const EventTable = ({ events, onSelect, onImport }) => {
  return (
    <div className="overflow-x-auto bg-white border rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Venue</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {events.map((event) => (
            <tr
              key={event._id}
              className="border-t hover:bg-gray-50"
            >
              <td
                className="px-4 py-3 font-medium cursor-pointer"
                onClick={() => onSelect(event)}
              >
                {event.title}
              </td>

              <td className="px-4 py-3">
                {new Date(event.dateTime).toLocaleDateString()}
              </td>

              <td className="px-4 py-3">
                {event.venueName || "—"}
              </td>

              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    event.status === "new"
                      ? "bg-green-100 text-green-700"
                      : event.status === "updated"
                      ? "bg-blue-100 text-blue-700"
                      : event.status === "inactive"
                      ? "bg-gray-200 text-gray-600"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {event.status}
                </span>
              </td>

              <td className="px-4 py-3">
                <button
                  disabled={event.status === "imported"}
                  onClick={() => onImport(event)}
                  className={`px-3 py-1 rounded text-xs font-medium ${
                    event.status === "imported"
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {event.status === "imported"
                    ? "Imported"
                    : "Import"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
