"use server";

import axios from "axios";

export async function fetchCrypto() {
  try {
    const res = await axios.get(`${process.env.API_URL_CRYPTO}`, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.API_KEY,
      },
    });
    // success
    return res.data;
  } catch (ex) {
    // error
    console.log(ex);
  }
}

export async function fetchFiat() {
  try {
    const res = await axios.get(`${process.env.API_URL_FIAT}`, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.API_KEY,
      },
    });
    // success
    return res.data;
  } catch (ex) {
    // error
    console.log(ex);
  }
}

export async function Conversion(prevState: any, formData: FormData) {
  const amount = formData.get("amount");
  const selectedCrypto = formData.get("crypto");
  const selectedCurrency = formData.get("fiat");

  try {
    const res = await axios.get(`${process.env.API_URL_PRICE_CONVERSION}`, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.API_KEY,
      },

      params: {
        amount: amount,
        symbol: selectedCrypto,
        convert: selectedCurrency,
      },
    });

    const formatCurrency = (amount: number, currency: string) => {
      const supportsStyleOption =
        typeof Intl.NumberFormat().resolvedOptions().style !== "undefined";

      const options = {
        style: supportsStyleOption ? "currency" : "decimal",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };

      return new Intl.NumberFormat(undefined, options).format(amount);
    };

    let formattedCurrency;

    if (selectedCurrency != null) {
      formattedCurrency = formatCurrency(
        res.data.data[0].quote[`${selectedCurrency}`].price,
        `${selectedCurrency}`,
      );
    }
    // success
    return {
      price: formattedCurrency,
    };
  } catch (ex) {
    // error
    console.log("Error while conversion");
    // response.status(500).json({ error: "Internal Server Error" });
  }
}
