import express from "express";
const router = express.Router();
import fs from "fs";
import crypto from "crypto";
import cors from "cors";
import "dotenv/config";
import axios from "axios";

const {PORT, BACKEND_URL, APP_ID, APP_KEY} = process.env;
const app = express();
app.use(cors());

app.use(express.json());

// Endpoint to fetch nutrition data from Nutritionix API
app.post("/api/nutrition", async (req, res) => {
  const { query } = req.body;  // The food item you want to search for
  
  try {
    const response = await axios.post(`${BACKEND_URL}/natural/nutrients`,
      {
        query: query},
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});