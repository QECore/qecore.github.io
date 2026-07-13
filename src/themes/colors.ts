import darkTheme from "./dark.json";
import extraDarkTheme from "./extra-dark.json";

export const themePalettes = {
  dark: darkTheme,
  "extra-dark": extraDarkTheme,
} as const;

export const accentColors = {
  amber: {
    primary: "hsl(38, 92%, 55%)",
    secondary: "hsl(25, 95%, 53%)",
  },
  indigo: {
    primary: "hsl(260, 92%, 65%)",
    secondary: "hsl(280, 95%, 55%)",
  },
} as const;
