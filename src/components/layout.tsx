import React, { FunctionComponent } from "react";
import Navbar from "./navbar";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Navbar></Navbar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
