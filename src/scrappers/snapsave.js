import axios from "axios";
import * as cheerio from "cheerio";

export async function snapsave(instaUrl) {
  try {
    const form = new URLSearchParams();
    form.append("url", instaUrl);

    // SnapSave endpoint (changes sometimes)
    const { data: html } = await axios.post(
      "https://snapsave.app/action.php?lang=en",
      form,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      }
    );

    const $ = cheerio.load(html);
    const link = $("a[href*='.mp4']").attr("href");

    return link || null;
  } catch (err) {
    console.error("SnapSave scraper error:", err.message);
    return null;
  }
}
