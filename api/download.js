import { snapsave } from "../src/scrapers/snapsave.js";

export default async function handler(req, res) {
  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: "Missing Instagram URL" });
    }

    const videoUrl = await snapsave(url);

    if (!videoUrl) {
      return res.status(500).json({ error: "Failed to fetch video URL" });
    }

    return res.status(200).json({ videoUrl });
  } catch (err) {
    console.error("Error in /api/download:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
