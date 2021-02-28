import { Link } from "gatsby";
import styled from "styled-components";

export enum sizes {
  sm = "540px",
  md = "720px",
  lg = "992px",
  xl = "1140px",
  xxl = "1320px",
}

interface ContainerProps {
  size?: sizes;
}

export const Container = styled.div<ContainerProps>`
  max-width: ${(props) => (props.size ? props.size : "unset")};
  margin: auto;
  padding: 1rem;
`;

export const FullHeightDiv = styled.div`
  height: calc(100vh - 5rem);
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.card};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  border-radius: 25px;
`;

export const Surface = styled.div`
  background-color: ${({ theme }) => theme.surface};
  padding: 1rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  border-radius: 25px;
`;

export const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

export const Ruler = styled.hr`
  border: 1px solid ${({ theme }) => theme.text};
`;

export const Button = styled.button`
  color: ${({ theme }) => theme.buttonColor};
  border: 2px solid;
  border-radius: 30px;
  font-weight: 500;
  padding: 0.3rem 0.6rem;
  background-color: ${({ theme }) => theme.card};

  &:focus {
    outline: 0;
  }
`;

export const ButtonSection = styled.div`
  margin-top: 3rem;
  display: flex;
`;

export const Grow = styled.div`
  flex-grow: 1;
`;

export const BigLinkButton = styled(Link)`
  color: white;
  background-color: #2ad484;
  border-radius: 30px;
  font-weight: 500;
  font-size: 1.5rem;
  padding: 1rem 1.5rem;
  text-decoration: none;
`;
