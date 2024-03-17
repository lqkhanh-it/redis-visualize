// pages/api/data.ts
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await createClient({
      url: "redis://10.40.114.226:6379",
      password: "",
      name: "redis-visualize",
    })
      .on("error", (err) => {
        console.log("Redis Client Error", err);
        res.status(400).json({ error: "Internal server error" });
        return;
      })
      .connect();

    await client?.connect();
    const value = await client?.keys("*");
    res.status(200).json(value);
    await client?.disconnect();
    return;
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Internal server error" });
  }
}
