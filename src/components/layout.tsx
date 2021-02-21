import React, { FunctionComponent, useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Navbar from "./navbar";

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
    font-family: 'Rubik';
    background: rgb(255,244,203);
    background: linear-gradient(45deg, rgba(255,244,203,1) 0%, rgba(255,241,235,1) 100%);
    min-height: 100vh;
  }

  h1,h2 {
    font-family: 'Dosis';
    font-weight: 700;
  }
`;

const lightTheme = {
  body: "#FAFAFA",
  text: "#000000",
};

const darkTheme = {
  body: "#252624",
  text: "#CCCCCC",
};

const Layout: FunctionComponent = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Navbar themeToggler={themeToggler}></Navbar>
      <main>{children}</main>
    </ThemeProvider>
  );
};

export default Layout;
