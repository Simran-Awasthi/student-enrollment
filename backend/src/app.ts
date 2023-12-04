import express, { Request, Response } from "express";
import mongoose from "mongoose";
import {
  authenticateToken,
  authenticateWarden,
  generateToken,
  parseTime,
} from "./utils";
import { Warden } from "./warden";
import { Slot, SlotDocument } from "./slot";

export const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/warden");

// Endpoint for registering a new warden account
app.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const existingWarden = await Warden.findOne({ username });
    if (existingWarden) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const token = generateToken(); // Generate a token for the new warden
    const newWarden = new Warden({
      username,
      password,
      tokens: [token],
      bookedSessions: [],
    });
    await newWarden.save();
    res.json({ message: "Warden registered successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for warden login
app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const token = await authenticateWarden(username, password);
  if (token) {
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

// Endpoint for getting free slots
app.get(
  "/free-slots",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      // Logic to retrieve and return free slots
      const warden = req.query.warden;
      const defaultAvailableSlots: SlotDocument[] = [];
      for (var slot of defaultSlots) {
        const { day, time } = slot;
        const existingSlot = await Slot.findOne({ day, time });
        if (!existingSlot) {
          const newSlot = new Slot({ ...slot, warden: warden });
          await newSlot.save();
          defaultAvailableSlots.push(newSlot);
        }
      }
      console.log(defaultAvailableSlots);
      const freeSlots = await Slot.find({ booked: false });
      res.json({ freeSlots: [...freeSlots] });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
// Endpoint for booking a session
app.post(
  "/book-slot",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { warden, day, time, currentWarden } = req.body;

    try {
      const slot = await Slot.findOne({
        warden,
        day,
        time: parseTime(time).toLocaleTimeString(),
        booked: false,
      });

      if (!slot) {
        return res.status(400).json({ error: "Slot not available" });
      }
      slot.booked = true;
      slot.bookedBy = currentWarden._id;
      await slot.save();

      res.json({
        message: "Slot booked successfully",
        bookedSessionId: slot._id,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Endpoint for getting pending sessions for a warden
app.get(
  "/pending-slots",
  authenticateToken,
  async (req: Request, res: Response) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    const warden = await Warden.findOne({ tokens: token });
    console.log(warden?.username);
    try {
      // Logic to retrieve and return pending sessions for the logged-in warden
      const pendingSessions = await Slot.find({
        warden: warden?.username,
        booked: true,
        day: { $gte: new Date(Date.now()).toLocaleDateString() },
      });
      res.json({ pendingSessions });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

const defaultSlots = [
  {
    day: "Thursday",
    time: parseTime("10:00 AM").toLocaleTimeString(),
    booked: false,
  },
  {
    day: "Friday",
    time: parseTime("10:00 AM").toLocaleTimeString(),
    booked: false,
  },
];
