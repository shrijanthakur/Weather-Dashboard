import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value);
    setValue("");
  }

  return (
    <form className="flex justify-center items-center pt-[30px]" onSubmit={handleSubmit}>
      <input
        className="rounded-[20px] h-10 border-1 bg-white border-gray-300 w-[230px] outline-none text-gray-800 font-sans pl-[15px] "
        placeholder="Enter City Name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="rounded-full border-2 border-white h-10 w-10 ml-[10px] flex items-center justify-center cursor-pointer "
        type="submit"
      >
        🔍
      </button>
    </form>
  );
}