import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { init, miniApp } from "@telegram-apps/sdk";
import { Header } from "./ui/Header";

async function initializeTelegramSDK(
  setIsTelegramOpened: React.Dispatch<React.SetStateAction<boolean>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) {
  setLoading(true);
  setError(null);
  try {
    await init();
    if (miniApp.ready.isAvailable()) {
      await miniApp.ready();
      setIsTelegramOpened(true);
    } else {
      setIsTelegramOpened(false);
      setError("Приложение доступно только через Telegram");
    }
  } catch (error) {
    setIsTelegramOpened(false);
    setError("Приложение доступно только через Telegram");
  } finally {
    setLoading(false);
  }
}

function App() {
  const [isTelegramOpened, setIsTelegramOpened] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    initializeTelegramSDK(setIsTelegramOpened, setLoading, setError);
  }, []);

  const incrementCount = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-svh"
        role="status"
        aria-live="polite"
      >
        Загрузка...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-svh p-4">
        <div className="text-xl font-semibold text-zinc-950 mb-4">{error}</div>
      </div>
    );
  }

  if (!isTelegramOpened) {
    return (
      <div className="flex flex-col items-center justify-center min-h-svh p-4">
        <div className="text-xl font-semibold">
          Данное приложение работает только через Telegram
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between min-h-svh p-4">
      <Header />
      <Button
        onClick={incrementCount}
        className="bg-blue-600 hover:bg-blue-700 text-2xl p-8 rounded-2xl"
      >
        Счетчик: {count}
      </Button>
    </div>
  );
}

export default App;
