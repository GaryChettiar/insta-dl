const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (req, res) => {
  const url = req.query.url;

  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const { data } = await axios.get(url, {
      headers: { "User-Agent": "Mozilla/5.0" }
    });

    const $ = cheerio.load(data);
    const videoUrl = $('meta[property="og:video"]').attr("content");

    if (!videoUrl) return res.status(404).json({ error: "Video not found" });

    return res.json({ videoUrl });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
