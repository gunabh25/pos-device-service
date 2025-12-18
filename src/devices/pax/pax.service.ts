import express from "express";
import net from "net";
import { PaxAuthRequest } from "./pax.types";

export const paxRouter = express.Router();

function sendToPax(request: PaxAuthRequest): Promise<any> {
  return new Promise((resolve, reject) => {
    const client = new net.Socket();

    client.connect(10009, "192.168.1.50", () => {
      client.write(JSON.stringify(request));
    });

    client.on("data", data => {
      resolve(JSON.parse(data.toString()));
      client.destroy();
    });

    client.on("error", err => reject(err));
  });
}

paxRouter.post("/authorize", async (req, res) => {
  const { amount, transactionId } = req.body;

  const response = await sendToPax({ amount, transactionId });

  if (response.authorizedAmount < amount) {
    return res.status(402).json({ status: "DECLINED" });
  }

  res.json({
    status: "APPROVED",
    authorizedAmount: response.authorizedAmount,
    rrn: response.rrn
  });
});
