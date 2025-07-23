"use client";

import { useCallback, useEffect, useState } from "react";
import Amount from "./amount";
import CurrenciesSelect from "./currencies-select";

type Props = {
  cryptoData: any[];
  fiatData: any[];
};

export default function Layout({ cryptoData, fiatData }: Props) {
  const [amount, setAmount] = useState<number | null>(null);
  const [crypto, setCrypto] = useState<string>("BTC");
  const [fiat, setFiat] = useState<string>("USD");
  const [converted, setConverted] = useState<string | null>(null);

  const handleCryptoChange = useCallback((val: string) => {
    setCrypto(val);
  }, []);

  const handleFiatChange = useCallback((val: string) => {
    setFiat(val);
  }, []);

  useEffect(() => {
    const runConversion = async () => {
      if (amount && crypto && fiat) {
        const res = await fetch(
          `/api?amount=${amount}&crypto=${crypto}&fiat=${fiat}`,
        );
        const result = await res.json();
        if (result.data[0].quote[fiat].price) {
          setConverted(
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: fiat,
            }).format(result.data[0].quote[fiat].price),
          );
        } else {
          setConverted(null);
        }
      }
    };

    runConversion();
  }, [amount, crypto, fiat]);

  return (
    <div className="m-8 flex flex-col space-y-4">
      <label htmlFor="amount">Enter Amount to Convert:</label>
      <Amount onChange={(val) => setAmount(val)} />

      <span>Select Crypto:</span>
      <CurrenciesSelect
        data={cryptoData}
        defaultValue="BTC"
        placeholder="Select Crypto"
        onChange={handleCryptoChange}
      />

      <span>Select Currency:</span>
      <CurrenciesSelect
        data={fiatData}
        defaultValue="USD"
        placeholder="Select Currency"
        onChange={handleFiatChange}
      />

      <span>In Currency:</span>
      <div className="h-10 w-80 bg-slate-100 p-2 text-center text-slate-900 md:w-96">
        {converted || "Enter data to see conversion"}
      </div>
    </div>
  );
}
