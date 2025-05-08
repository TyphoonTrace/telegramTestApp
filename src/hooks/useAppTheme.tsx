import {
  type Dispatch,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type AppTheme = "system" | "light" | "dark";

const useAppTheme = (): [AppTheme, Dispatch<AppTheme>, boolean] => {
  const storageKey = "appTheme";
  const storedTheme = localStorage.getItem(storageKey) as AppTheme | null;
  const defaultTheme: AppTheme = storedTheme || "system";
  const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const applyDarkMode = (enable: boolean) => {
    document.documentElement.classList.toggle("dark", enable);
  };

  const [theme, setTheme] = useState<AppTheme>(defaultTheme);
  const themeRef = useRef(theme);

  const [isThemeDarkBySystem, setIsThemeDarkBySystem] = useState(
    darkModeMediaQuery.matches
  );

  useLayoutEffect(() => {
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (themeRef.current === "system") {
        applyDarkMode(e.matches);
        setIsThemeDarkBySystem(e.matches);
      }
    };

    darkModeMediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  useEffect(() => {
    themeRef.current = theme;
    localStorage.setItem(storageKey, theme);
    applyDarkMode(
      theme === "dark" || (theme === "system" && darkModeMediaQuery.matches)
    );
  }, [theme]);

  return [theme, setTheme, isThemeDarkBySystem];
};

export { useAppTheme };
