import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Data from './models/Data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const mongoURI = "mongodb+srv://parvez:tdbCipH8ebjtRHkv@cluster0.dizvfdk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI).then(async () => {
  console.log("Connected to MongoDB");

  // Read JSON file
  const dataPath = path.join(__dirname, 'jsondata.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  // Insert data into MongoDB
  try {
    await Data.insertMany(data);
    console.log("Data imported successfully");
  } catch (err) {
    console.error("Error importing data:", err);
  } finally {
    mongoose.connection.close();
  }
}).catch((err) => {
  console.error("Failed to connect to MongoDB", err);
});
