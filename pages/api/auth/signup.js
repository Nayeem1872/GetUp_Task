import connectMongo from "@/database/conn";
import Users from "@/model/Schema";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  connectMongo().catch((error) => res.json({ error: "Connection Failed...!" }));

  // Only POST
  if (req.method === "POST") {
    if (!req.body) return res.status(404).json({ error: "Don't have form Data...!" });
    const { username, email, password } = req.body;

    // Check duplicate users
    const checkexisting = await Users.findOne({ email });
if (checkexisting) return res.status(409).json({ message: "User Already Exist!!!" });



    try {
      // Hash Password and create user
      const hashedPassword = await hash(password, 12);
      const user = await Users.create({ username, email, password: hashedPassword });

      res.status(201).json({ status: true, user });
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  } else {
    res.status(500).json({ message: "HTTP method not valid only post accepted!!" });
  }
}
