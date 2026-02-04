import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import Event from "../models/Event.model.js";

const seedEvents = async () => {
  await connectDB();

  await Event.insertMany([
    {
      title: "Sydney Live Music Night",
      dateTime: new Date(),
      venueName: "Sydney Opera House",
      city: "Sydney",
      description: "An amazing live music experience in Sydney.",
      imageUrl:
        "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
      sourceName: "Seed Data",
      originalEventUrl: "https://www.eventbrite.com/",
      status: "new",
    },
    {
      title: "Sydney Comedy Evening",
      dateTime: new Date(),
      venueName: "Enmore Theatre",
      city: "Sydney",
      description: "Laugh out loud with top comedians.",
      imageUrl:
        "https://images.unsplash.com/photo-1527224857830-43a7acc85260",
      sourceName: "Seed Data",
      originalEventUrl: "https://www.timeout.com/sydney",
      status: "updated",
    },
    {
    title: "Sydney Live Music Night",
    dateTime: new Date("2026-03-10T19:00:00"),
    venueName: "Sydney Opera House",
    city: "Sydney",
    description: "An amazing live music experience in Sydney.",
    imageUrl:
      "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2",
    sourceName: "Seed Data",
    originalEventUrl: "https://www.eventbrite.com/",
    status: "new",
  },
  {
    title: "Sydney Comedy Evening",
    dateTime: new Date("2026-03-12T20:00:00"),
    venueName: "Enmore Theatre",
    city: "Sydney",
    description: "Laugh out loud with top comedians.",
    imageUrl:
      "https://images.unsplash.com/photo-1527224857830-43a7acc85260",
    sourceName: "Seed Data",
    originalEventUrl: "https://www.timeout.com/sydney",
    status: "updated",
  },
  {
    title: "Sydney Art & Culture Expo",
    dateTime: new Date("2026-03-15T10:00:00"),
    venueName: "Art Gallery of NSW",
    city: "Sydney",
    description: "Explore contemporary and classic art exhibitions.",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    sourceName: "Seed Data",
    originalEventUrl: "https://www.artgallery.nsw.gov.au/",
    status: "new",
  },
  {
    title: "Sydney Food Festival",
    dateTime: new Date("2026-03-18T12:00:00"),
    venueName: "Darling Harbour",
    city: "Sydney",
    description: "A weekend of delicious food and live entertainment.",
    imageUrl:
      "https://images.unsplash.com/photo-1499028344343-cd173ffc68a9",
    sourceName: "Seed Data",
    originalEventUrl: "https://www.sydney.com/",
    status: "new",
  },
  {
    title: "Startup Networking Meetup Sydney",
    dateTime: new Date("2026-03-20T18:00:00"),
    venueName: "Fishburners",
    city: "Sydney",
    description: "Connect with founders, developers, and investors.",
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    sourceName: "Seed Data",
    originalEventUrl: "https://www.meetup.com/",
    status: "updated",
  },
  {
    title: "Sydney Fitness & Wellness Workshop",
    dateTime: new Date("2026-03-22T08:00:00"),
    venueName: "Bondi Beach",
    city: "Sydney",
    description: "Morning fitness and wellness sessions by the beach.",
    imageUrl:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a",
    sourceName: "Seed Data",
    originalEventUrl: "https://www.eventbrite.com/",
    status: "new",
  },
  {
    title: "Sydney Tech Conference 2026",
    dateTime: new Date("2026-03-25T09:00:00"),
    venueName: "International Convention Centre",
    city: "Sydney",
    description: "Annual technology conference with industry leaders.",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
    sourceName: "Seed Data",
    originalEventUrl: "https://www.techconference.com/",
    status: "new",
  },
  ]);

  console.log("✅ Sample events inserted");
  process.exit();
};

seedEvents();
