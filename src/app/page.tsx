import Form from "@/components/convertor";

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <div className="card flex flex-col justify-center">
        <h1 className="my-8 self-center text-2xl font-semibold md:text-3xl">
          Crypto-Fiat Converter
        </h1>
        <Form />
      </div>
    </div>
  );
}
