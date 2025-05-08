import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { init, miniApp } from "@telegram-apps/sdk";

function App() {
  const [isTelegramOpened, setIsTelegramOpened] = useState<boolean | null>(
    null
  );
  const [count, setCount] = useState(0);

  useEffect(() => {
    const initializeTelegramSDK = async () => {
      try {
        await init();
        if (miniApp.ready.isAvailable()) {
          await miniApp.ready();
          setIsTelegramOpened(true);
          //   console.log("Mini App успех запуска");
        } else {
          setIsTelegramOpened(false);
        }
      } catch (error) {
        // console.error("Mini App ошибка запуска:", error);
        setIsTelegramOpened(false);
      }
    };
    initializeTelegramSDK();
  }, []);

  if (isTelegramOpened === null) {
    return (
      <div className="flex items-center justify-center min-h-svh">
        Загрузка...
      </div>
    );
  }

  if (!isTelegramOpened) {
    return (
      <div className="flex flex-col items-center justify-center min-h-svh">
        <div className="text-xl font-semibold">
          Данное приложение работает только через Telegram
        </div>
      </div>
    );
  }

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
