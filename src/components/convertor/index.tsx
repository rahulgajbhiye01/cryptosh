import axios from "axios";
import Layout from "./ui/layout";

const API_KEY = process.env.API_KEY || "";
const CRYPTO_URL = process.env.API_URL_CRYPTO || "";
const FIAT_URL = process.env.API_URL_FIAT || "";

// Fetch Crypto's
async function fetchCrypto() {
  try {
    const res = await axios.get(`${CRYPTO_URL}`, {
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY,
      },
    });
    // success
    return res.data.data;
  } catch (ex) {
    // error
    console.log(ex);
  }
}

// Fetch Fiat's
async function fetchFiat() {
  try {
    const res = await axios.get(`${FIAT_URL}`, {
      headers: {
        "X-CMC_PRO_API_KEY": API_KEY,
      },
    });
    // success
    return res.data.data;
  } catch (ex) {
    // error
    console.log(ex);
  }
}

export default async function Convertor() {
  const cryptoList = await fetchCrypto();
  const fiatList = await fetchFiat();

  return <Layout cryptoData={cryptoList} fiatData={fiatList} />;
}
