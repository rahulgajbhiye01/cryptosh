import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const amount = parseFloat(searchParams.get("amount") || "0");
  const crypto = searchParams.get("crypto") || "";
  const fiat = searchParams.get("fiat") || "";

  const data = await convertPrice({ amount, crypto, fiat });
  return NextResponse.json(data);
}
