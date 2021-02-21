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
  background-color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
  border-radius: 25px;
`;

export const Surface = styled.div`
  background-color: ${({ theme }) => theme.body};
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
  border: 1px solid #000000;
`;
