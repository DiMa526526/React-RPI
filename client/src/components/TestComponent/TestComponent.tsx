import { useState } from "react";

export default function TestComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Счётчик: {count}</p>
      <button
        onClick={() => {
          console.log("Клик!");
          setCount((c) => c + 1);
        }}
      >
        Нажми ({count})
      </button>
    </div>
  );
}
