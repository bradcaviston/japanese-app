import React, { FunctionComponent, useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Navbar from "./navbar";

const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
    font-family: 'Rubik';
  }
`;

const lightTheme = {
  body: "white",
  text: "black",
};

const darkTheme = {
  body: "black",
  text: "white",
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
