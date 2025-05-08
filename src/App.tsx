import { Button } from "@/components/ui/button";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button
        onClick={() => setCount((prev) => prev + 1)}
        className="bg-blue-600 hover:bg-blue-700"
      >
        Count {count}
      </Button>
    </div>
  );
}

export default App;
