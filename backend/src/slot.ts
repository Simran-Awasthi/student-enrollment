import mongoose, { Schema, Document } from "mongoose";

// Slot document interface
export interface SlotDocument extends Document {
  warden: string;
  day: string;
  time: string;
  bookedBy?: string;
  booked: boolean;
}

// Slot schema
const SlotSchema = new Schema({
  warden: { type: String, required: true },
  day: { type: String, required: true },
  time: { type: String, required: true },
  bookedBy: { type: String, required: false },
  booked: { type: Boolean, default: false },
});

export const Slot = mongoose.model<SlotDocument>("Slot", SlotSchema);
