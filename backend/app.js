import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Data from './models/Data.js'; // Ensure the path to Data.js is correct

const app = express();
const PORT = process.env.PORT || 5001; // Change the port to 5001

app.use(cors());
app.use(express.json());

const mongoURI = "mongodb+srv://parvez:tdbCipH8ebjtRHkv@cluster0.dizvfdk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// API endpoint to get data
app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});
