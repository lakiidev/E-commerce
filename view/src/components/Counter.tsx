import { FC, useState } from "react";

interface CounterProps {
  count: number;
  setCount: (count: number) => void;
}

const Counter: FC<CounterProps> = ({ count, setCount }) => {
  return (
    <div className="flex-1 flex justify-between items-center rounded-full bg-white min-w-40 p-3 border-black border-[1px]">
      <button
        className="bg-black aspect-square h-full rounded-full flex items-center justify-center text-4xl hover:text-[#01E3EB] focus:text-[#01E3EB] transition-all duration-200"
        onClick={() => (count > 1 ? setCount(count - 1) : 0)}
      >
        -
      </button>
      <p className="text-2xl font-bold text-black">{count}</p>
      <button
        className="bg-black aspect-square h-full rounded-full flex items-center justify-center text-4xl hover:text-[#01E3EB] focus:text-[#01E3EB] transition-all duration-200"
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
