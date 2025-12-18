import axios from "axios";
import { enqueue } from "../offline/queue.service";

const BACKEND_URL = "https://api.centralpos.com";

export async function syncSale(sale: any) {
  try {
    await axios.post(`${BACKEND_URL}/inventory/deduct`, sale);
  } catch {
    enqueue({ type: "SALE_SYNC", payload: sale });
  }
}
