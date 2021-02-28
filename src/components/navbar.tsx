import { Link } from "gatsby";
import React, { FunctionComponent, useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../theme/theme-wrapper";
import { Button, Container, sizes } from "./common";

const NavContainer = styled(Container)`
  background-color: ${({ theme }) => theme.surface};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  height: 5rem;
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
  text-decoration: none;
  color: ${({ theme }) => theme.text};
`;

const Navbar: FunctionComponent = () => {
  const value = useContext(ThemeContext);

  return (
    <nav>
      <NavContainer size={sizes.xxl}>
        <Flex>
          <Brand to="/">Japanese Quiz</Brand>
          <Grow />
          <div>
            <Button onClick={value.themeToggler}>Switch Theme</Button>
          </div>
        </Flex>
      </NavContainer>
    </nav>
  );
};

export default Navbar;
