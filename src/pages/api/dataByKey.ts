// pages/api/dataByKey.ts
import { NextApiRequest, NextApiResponse } from "next";
import redis from "redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = redis?.createClient({
    url: "redis://10.40.114.226:6379",
    password: "",
    name: "redis-visualize",
  });
  const { key } = req.query;

  if (!key || typeof key !== "string") {
    return res.status(400).json({ error: "Invalid key" });
  }

  const value = await client.get(key);
  res.status(200).json(value);
  await client.disconnect();
  return;
}
