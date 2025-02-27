import React from "react";
import "normalize.css";
import ThemeWrapper from "./src/theme/theme-wrapper";

export const wrapPageElement = ({ element }) => (
  <ThemeWrapper>{element}</ThemeWrapper>
);
