import React, { FunctionComponent } from "react";
import { Helmet } from "react-helmet";
import Navbar from "./navbar";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <Helmet title="Japanese App" />
      <Navbar></Navbar>
      <main>{children}</main>
    </>
  );
};

export default Layout;
