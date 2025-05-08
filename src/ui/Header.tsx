import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const [theme, setTheme, isThemeDarkBySystem] = useAppTheme();

  return (
    <header className="app__header border-b-2 flex flex-row justify-between p-4">
      <a href="#" className="flex flex-row items-end gap-4 h-full">
        {/* <img
          src={
            theme === "dark" || (theme === "system" && isThemeDarkBySystem)
              ? "/src/assets/icons/flame-light.svg"
              : "/src/assets/icons/flame-dark.svg"
          }
          alt=""
          className="max-h-10"
        /> */}
        <h1 className="text-2xl">Telegram mini app</h1>
      </a>

      <div className="flex flex-row items-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="">
              {theme === "dark" ||
              (theme === "system" && isThemeDarkBySystem) ? (
                <Moon />
              ) : (
                <Sun />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuCheckboxItem
              checked={theme === "system"}
              onCheckedChange={() => setTheme("system")}
            >
              System
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={theme === "dark"}
              onCheckedChange={() => setTheme("dark")}
            >
              Dark
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={theme === "light"}
              onCheckedChange={() => setTheme("light")}
            >
              Light
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export { Header };
