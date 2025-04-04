import express from "express";
const router = express.Router();
import cors from "cors";
import "dotenv/config";
import axios from "axios";

const { PORT, BACKEND_URL, APP_ID, APP_KEY } = process.env;
const app = express();
app.use(cors());

app.use(express.json());

app.post("/nutrition", async (req, res) => {
  const { query } = req.body;

  try {
    const response = await axios.post(
      `${BACKEND_URL}/natural/nutrients`,
      {
        query: query,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-app-id": APP_ID,
          "x-app-key": APP_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
    res.status(500).json({ error: "Error fetching nutrition data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
