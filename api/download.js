const axios = require("axios");
const cheerio = require("cheerio");

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Missing 'url' query parameter." });
  }

  try {
    const response = await axios.get(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const $ = cheerio.load(response.data);
    const videoUrl = $('meta[property="og:video"]').attr("content");

    if (!videoUrl) {
      return res.status(404).json({ error: "Video URL not found. Is the post private or removed?" });
    }

    return res.status(200).json({ videoUrl });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch Instagram URL", details: err.message });
  }
};
