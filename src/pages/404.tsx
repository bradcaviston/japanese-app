import * as React from "react";
import styled from "styled-components";
import {
  Container,
  sizes,
  Surface,
  Ruler,
  ButtonSection,
  Grow,
  BigLinkButton,
} from "../components/common";
import Layout from "../components/layout";

const Heading = styled.h1`
  margin-bottom: 0;
`;

const NotFoundPage = () => {
  return (
    <Layout>
      <Container size={sizes.lg}>
        <Surface>
          <Heading>404</Heading>
          <Ruler />
          <p>Looks like you navigated to a page that does not exist.</p>
          <ButtonSection>
            <Grow />
            <BigLinkButton to="/quiz/selection">Go home</BigLinkButton>
          </ButtonSection>
        </Surface>
      </Container>
    </Layout>
  );
};

export default NotFoundPage;
