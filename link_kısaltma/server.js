const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// URL Kısaltma API'si için POST isteği
app.post("/shorten", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Geçerli bir URL giriniz." });
  }

  try {
    const response = await fetch("https://cleanuri.com/api/v1/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ url }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("CleanURI API hatası:", response.status, errorText);
      return res
        .status(502)
        .json({ error: "CleanURI API hatası", details: errorText });
    }

    const data = await response.json();

    // Eğer API yanıt formatı beklenmiyorsa hata göster
    if (!data.short_url) {
      console.error("Beklenmeyen API Yanıtı:", data);
      return res.status(500).json({ error: "Beklenmeyen API yanıtı!" });
    }

    res.json({ shortUrl: data.short_url });
  } catch (error) {
    console.error("Sunucu hatası:", error);
    res.status(500).json({ error: "Sunucu hatası", details: error.message });
  }
});

// Sunucu Başlatma
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});
