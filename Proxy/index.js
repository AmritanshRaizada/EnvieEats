const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/restaurants", async (req, res) => {
  try {
    const swiggyURL =
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.63270&lng=77.21980&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

    const response = await fetch(swiggyURL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Accept: "application/json",
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Proxy Error:", err);
    res.status(500).json({ error: "Failed to fetch restaurant data." });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
