"use client";

import { useFormState } from "react-dom";
import { Conversion } from "@/lib/actions";
import CurrenciesSelect from "./currencies-select";

export default function Form() {
  const [formState, formAction] = useFormState(Conversion, null);
  return (
    <form
      action={formAction}
      className="mt-8 flex flex-col justify-center p-4 md:m-4"
    >
      <label htmlFor="amount" className="my-2">
        Enter Amount to Convert :
      </label>
      <input
        name="amount"
        type="number"
        step="1"
        min="1"
        placeholder="Enter Amount to Convert"
        required
        className="h-auto w-80 bg-slate-100 p-2 px-3 text-slate-900 md:w-96"
      />
      <span className="my-2">Select Crypto :</span>
      <div className="h-10">
        <CurrenciesSelect
          name="crypto"
          defaultValue="BTC"
          placeholder="Select Crypto"
        />
      </div>
      <span className="my-2">Select Currency :</span>
      <div className="h-10">
        <CurrenciesSelect
          name="fiat"
          defaultValue="USD"
          placeholder="Select Currency"
        />
      </div>
      <span className="my-2">In Currency :</span>
      <div
        id="currencyAmount"
        className="h-10 w-80 bg-slate-100 p-2 text-center text-slate-900 md:w-96"
      >
        {formState?.price}
      </div>
      <button
        type="submit"
        className="mx-auto my-4 rounded border-2 border-solid bg-slate-100 px-4 py-2 text-slate-900 md:hover:border-indigo-800"
      >
        Convert
      </button>
    </form>
  );
}
