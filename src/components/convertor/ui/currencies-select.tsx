"use client";

import { useEffect, useState } from "react";
import Select from "react-select";

type Props = {
  data: any[];
  defaultValue: string;
  placeholder: string;
  onChange: (val: string) => void;
};

type OptionType = {
  label: string;
  value: string;
};

const CurrenciesSelect: React.FC<Props> = ({
  data,
  defaultValue,
  placeholder,
  onChange,
}) => {
  const [loading, setLoading] = useState(true); // Loading system.
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionType>();

  useEffect(() => {
    const mapped = data.map((item) => ({
      label: `${item.name} (${item.symbol})`,
      value: item.symbol,
    }));
    setOptions(mapped);

    const def = mapped.find((opt) => opt.value === defaultValue);
    setSelectedOption(def);
    setLoading(false);
    if (def) {
      onChange(def.value);
    }
  }, [data, defaultValue, onChange]);

  const handleSelectChange = (option: OptionType | null) => {
    setSelectedOption(option!);
    if (option) onChange(option.value);
  };

  return (
    <>
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <Select
          options={options}
          value={selectedOption}
          placeholder={placeholder}
          onChange={handleSelectChange}
          isSearchable
        />
      )}
    </>
  );
};

export default CurrenciesSelect;
