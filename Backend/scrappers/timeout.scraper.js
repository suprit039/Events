import axios from "axios";
import * as cheerio from "cheerio";

const TIMEOUT_URL = "https://www.timeout.com/sydney/events";

const scrapeTimeout = async () => {
  const { data } = await axios.get(TIMEOUT_URL);
  const $ = cheerio.load(data);

  const events = [];

  $(".card-content").each((_, el) => {
    const title = $(el).find("h3").text().trim();
    const url = $(el).find("a").attr("href");
    const image = $(el).find("img").attr("src");
    const description = $(el).find("p").text().trim();

    if (!title || !url) return;

    events.push({
      title,
      dateTime: new Date(), // TimeOut often loads date inside event page
      venueName: "",
      venueAddress: "",
      city: "Sydney",
      description,
      categories: [],
      imageUrl: image,
      sourceName: "TimeOut Sydney",
      originalEventUrl: `https://www.timeout.com${url}`,
    });
  });

  return events;
};

export default scrapeTimeout;
