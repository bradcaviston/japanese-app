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
`;

export const FullHeightSection = styled.section`
  height: calc(100vh - 5rem);
`;
