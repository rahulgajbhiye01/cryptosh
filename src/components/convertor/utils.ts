import axios from "axios";

const API_KEY = process.env.API_KEY || "";
const PRICE_CONVERSION_URL = process.env.API_URL_PRICE_CONVERSION || "";

// Conversion
export async function convertPrice({
  amount,
  crypto,
  fiat,
}: {
  amount: number;
  crypto: string;
  fiat: string;
}) {
  try {
    console.log(amount, crypto, fiat);

    const res = await axios.get(PRICE_CONVERSION_URL, {
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY,
      },
      params: {
        amount,
        symbol: crypto,
        convert: fiat,
      },
    });

    return res.data;
  } catch (err) {
    console.error("Conversion error:", err);
    return { error: "Conversion failed" };
  }
}
