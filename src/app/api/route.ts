import { NextRequest, NextResponse } from "next/server";
import { convertPrice } from "@/components/convertor/utils";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const amount = parseFloat(searchParams.get("amount") || "0");
  const crypto = searchParams.get("crypto") || "";
  const fiat = searchParams.get("fiat") || "";

  const data = await convertPrice({ amount, crypto, fiat });
  return NextResponse.json(data);
}
