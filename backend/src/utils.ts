import { v4 as uuidv4 } from "uuid";
import { Warden } from "./warden";
import { Request, Response } from "express";
// Function to generate a bearer token
export function generateToken(): string {
  return uuidv4();
}

// Function to authenticate a warden and generate a token
export async function authenticateWarden(
  username: string,
  password: string
): Promise<string | null> {
  const warden = await Warden.findOne({ username, password });
  if (warden) {
    const token = generateToken();
    warden.tokens.push(token);
    await warden.save();
    return token;
  }
  return null;
}

// Function to validate token
export async function validateToken(token: string): Promise<boolean> {
  const warden = await Warden.findOne({ tokens: token });
  return !!warden;
}

export async function authenticateToken(
  req: Request,
  res: Response,
  next: Function
) {
  const token = req.headers["authorization"]?.split(" ")[1];
  const warden = await Warden.findOne({ tokens: token });
  if (!token || !warden) {
    return res.status(401).json({ error: "Invalid token" });
  }
  req.body.currentWarden = warden;
  next();
}

export function parseTime(timeString: string) {
  const [hourMinute, amOrPm] = timeString.split(/(?=[AP]M)/); // Split time and AM/PM

  let [hour, minute] = hourMinute.split(":"); // Extract hour and minute
  hour = parseInt(hour, 10).toString(); // Convert hour to string
  minute = parseInt(minute, 10).toString(); // Convert minute to string

  if (amOrPm.toUpperCase() === "PM" && hour !== "12") {
    hour = (parseInt(hour, 10) + 12).toString(); // Convert to 24-hour format if PM and not 12 PM
  }

  const date = new Date();
  date.setHours(parseInt(hour, 10));
  date.setMinutes(parseInt(minute, 10));
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
}
