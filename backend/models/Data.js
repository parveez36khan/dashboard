// models/Data.js
import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
  // Define your schema based on JSON structure
  intensity: Number,
  likelihood: Number,
  relevance: Number,
  year: Number,
  country: String,
  topics: [String],
  region: String,
  city: String,
  // Add other fields as needed
});

const Data = mongoose.model('Data', DataSchema);

export default Data;
