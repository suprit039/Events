import puppeteer from "puppeteer";

const EVENTBRITE_URL =
  "https://www.eventbrite.com/d/australia--sydney/events/";

const scrapeEventbrite = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(EVENTBRITE_URL, { waitUntil: "networkidle2" });

  const events = await page.evaluate(() => {
    const cards = document.querySelectorAll("section.search-event-card-wrapper");

    return Array.from(cards).map((card) => {
      const title =
        card.querySelector("h3")?.innerText || "No title";

      const dateText =
        card.querySelector("time")?.getAttribute("datetime");

      const venue =
        card.querySelector(".event-card__venue")?.innerText || "";

      const image =
        card.querySelector("img")?.src || "";

      const url =
        card.querySelector("a")?.href || "";

      return {
        title,
        dateTime: dateText ? new Date(dateText) : null,
        venueName: venue,
        venueAddress: "",
        city: "Sydney",
        description: "",
        categories: [],
        imageUrl: image,
        sourceName: "Eventbrite",
        originalEventUrl: url,
      };
    });
  });

  await browser.close();

  return events.filter((e) => e.originalEventUrl);
};

export default scrapeEventbrite;
