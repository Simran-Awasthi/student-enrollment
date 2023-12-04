import mongoose from "mongoose";

// Define MongoDB schemas and models
interface WardenDocument extends mongoose.Document {
  username: string;
  password: string;
  tokens: string[];
  bookedSessions: string[];
}

const WardenSchema = new mongoose.Schema({
  username: String,
  password: String,
  tokens: [String],
  bookedSessions: [String],
});

export const Warden = mongoose.model<WardenDocument>("Warden", WardenSchema);
