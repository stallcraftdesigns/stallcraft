"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
  },
});

const cache = createCache({ key: "css", prepend: true });

export default function Providers({ children }) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
