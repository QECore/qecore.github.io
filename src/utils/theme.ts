import darkTheme from "../themes/dark.json";
import extraDarkTheme from "../themes/extra-dark.json";

export type ThemeType = "dark" | "extra-dark";

export const applyTheme = (theme: ThemeType) => {
  const root = document.documentElement;
  const variables = theme === "extra-dark" ? extraDarkTheme : darkTheme;
  
  // Both themes are dark, so ensure .dark class is always present
  root.classList.add("dark");
  
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  
  localStorage.setItem("theme", theme);
};
