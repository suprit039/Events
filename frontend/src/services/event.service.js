const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export const fetchEvents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const saveLead = async (leadData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error saving lead:", error);
    throw error;
  }
};
export const importEvent = async (eventId, notes = "") => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
  const response = await fetch(
    `${API_BASE_URL}/events/import/${eventId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ notes }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to import event");
  }

  return response.json();
};
