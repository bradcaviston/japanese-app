import { Link } from "gatsby";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Container, sizes } from "./common";

const NavContainer = styled(Container)`
  height: 5rem;
  background-color: lightgrey;
  padding: 0 0.5rem;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const Grow = styled.span`
  flex-grow: 1;
`;

const Brand = styled(Link)`
  font-family: "Dosis";
  font-weight: bold;
  font-size: 1.5rem;
`;

interface NavbarProps {
  themeToggler: () => void;
}

const Navbar: FunctionComponent<NavbarProps> = ({ themeToggler }) => {
  return (
    <nav>
      <NavContainer size={sizes.xxl}>
        <Flex>
          <Brand to="/">Learn Japanese</Brand>
          <Grow />
          <div>
            <button onClick={themeToggler}>Switch Theme</button>
          </div>
        </Flex>
      </NavContainer>
    </nav>
  );
};

export default Navbar;
