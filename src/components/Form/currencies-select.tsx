"use client";
import { useEffect, useState } from "react";
import Select from "react-select";
import { fetchCrypto, fetchFiat } from "@/lib/actions";

type Props = {
  defaultValue: string;
  placeholder: string;
  name: string;
};

type OptionType = {
  label: string;
  value: string;
};

const CurrenciesSelect: React.FC<Props> = ({
  name,
  defaultValue,
  placeholder,
}) => {
  const [loading, setLoading] = useState(true); // Loading system.
  const [options, setOptions] = useState<OptionType[]>([]); // To store option list.
  const [selectedOption, setSelectedOption] = useState<OptionType>(); //To store the selected option.

  //Function to format the raw data.
  const optionsContent = (data: any) => {
    let content = [];
    if (data != null) {
      for (let item of data) {
        content.push({
          label: item.name + "  (" + item.symbol + ")",
          value: item.symbol,
        });
      }
    }
    return content;
  };

  // API call to fetch the CryptoCurrency & Currencies list
  useEffect(() => {
    async function fetchList() {
      try {
        const response = await (name === "crypto"
          ? fetchCrypto()
          : fetchFiat());
        const filteredData = optionsContent(response.data);
        setOptions(filteredData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchList();
  }, []);

  // Set the default labeling & value once the options list is ready.
  useEffect(() => {
    if (options.length > 0) {
      const defaultOption = options.find(
        (item: any) => item.value === defaultValue,
      );
      setSelectedOption(defaultOption);
      setLoading(false);
    }
  }, [options]);

  //Handle the select button changes.
  const handleSelectChange = (selectedOption: any) => {
    setSelectedOption(selectedOption);
  };

  return (
    <>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <Select
          name={name}
          placeholder={placeholder}
          options={options}
          value={selectedOption}
          isSearchable={true}
          onChange={handleSelectChange}
          className="h-auto w-80 text-slate-900 md:w-96"
        />
      )}
    </>
  );
};

export default CurrenciesSelect;
