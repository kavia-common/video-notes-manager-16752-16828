import React, { createContext, useContext } from "react";
import { Theme } from "../types";

const ThemeCtx = createContext<Theme>({
  primary: "#3b82f6",
  secondary: "#6366f1",
  accent: "#f59e42",
  background: "#ffffff",
  text: "#0f172a",
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeCtx.Provider value={useThemeDefaults()}>{children}</ThemeCtx.Provider>;
};

function useThemeDefaults(): Theme {
  return {
    primary: "#3b82f6",
    secondary: "#6366f1",
    accent: "#f59e42",
    background: "#ffffff",
    text: "#0f172a",
  };
}

// PUBLIC_INTERFACE
export const useTheme = () => useContext(ThemeCtx);
