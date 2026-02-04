import Event from "../models/Event.model.js";

export const getEvents = async (filters = {}) => {
  const query = {};

  if (filters.city) {
    query.city = filters.city;
  }

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.keyword) {
    query.$or = [
      { title: { $regex: filters.keyword, $options: "i" } },
      { venueName: { $regex: filters.keyword, $options: "i" } },
      { description: { $regex: filters.keyword, $options: "i" } },
    ];
  }

  if (filters.startDate && filters.endDate) {
    query.dateTime = {
      $gte: new Date(filters.startDate),
      $lte: new Date(filters.endDate),
    };
  }

  return Event.find(query).sort({ dateTime: 1 });
};
