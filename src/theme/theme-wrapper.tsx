import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
    font-family: 'Rubik';
    background: ${({ theme }) => theme.body};
    background: ${({ theme }) => theme.bodyGradient};
    min-height: 100vh;
  }

  h1,h2 {
    font-family: 'Dosis';
    font-weight: 700;
  }
`;

const lightTheme = {
  body: "rgb(255,244,203)",
  bodyGradient:
    "linear-gradient(45deg, rgba(255,244,203,1) 0%, rgba(255,241,235,1) 100%)",
  surface: "#FAFAFA",
  card: "white",
  cardContrast: "#eaeaea",
  text: "#000000",
  buttonColor: "blue",
  disabledText: "#cecece",
  disabledBackground: "#eaeaea",
  green: "#2ad484",
  caret: "black",
};

const darkTheme = {
  body: "rgb(28,31,50)",
  bodyGradient:
    "linear-gradient(45deg, rgba(28,31,50,1) 0%, rgba(41,23,42,1) 100%)",
  surface: "#292929",
  card: "#444444",
  cardContrast: "#565656",
  text: "#CCCCCC",
  buttonColor: "#9696ff",
  disabledText: "#444444",
  disabledBackground: "#333333",
  green: "#2ad484",
  caret: "white",
};

export const ThemeContext = createContext({
  theme: lightTheme,
  themeToggler: () => {},
});

const ThemeWrapper: FunctionComponent = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);
  const themeToggler = () => {
    theme === lightTheme ? setTheme(darkTheme) : setTheme(lightTheme);
  };

  useEffect(() => {
    const darkList = matchMedia("(prefers-color-scheme: dark)");

    if (darkList.matches) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  }, []);

  useEffect(() => {
    const darkList = window.matchMedia("(prefers-color-scheme: dark)");

    const handler = (event) => {
      if (event.matches) {
        setTheme(darkTheme);
      } else {
        setTheme(lightTheme);
      }
    };

    darkList.addEventListener("change", handler);

    return () => {
      darkList.removeEventListener("change", handler);
    };
  });

  return (
    <ThemeContext.Provider value={{ theme: lightTheme, themeToggler }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeWrapper;
