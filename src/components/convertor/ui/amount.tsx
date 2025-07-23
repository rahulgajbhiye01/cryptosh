type Props = {
  onChange: (val: number | null) => void;
};

const Amount = ({ onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value ? Number(value) : null);
  };

  return (
    <input
      type="number"
      min="1"
      placeholder="Enter Amount"
      onChange={handleChange}
      className="h-auto w-80 bg-slate-100 p-2 px-3 text-slate-900 md:w-96"
    />
  );
};

export default Amount;
