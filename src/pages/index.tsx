import React from "react";
import styled from "styled-components";
import {
  BigLinkButton,
  ButtonSection,
  Container,
  Grow,
  Ruler,
  sizes,
  Surface,
} from "../components/common";
import Layout from "../components/layout";

const Heading = styled.h1`
  margin-bottom: 0;
`;

function IndexPage() {
  return (
    <Layout>
      <Container size={sizes.lg}>
        <Surface>
          <Heading>Welcome to my Japanese quiz app!</Heading>
          <Ruler />
          <p>
            With this app you can study the Japanese Hiragana and Katakana
            writing systems.
          </p>
          <ButtonSection>
            <Grow />
            <BigLinkButton to="/quiz/selection">Begin</BigLinkButton>
          </ButtonSection>
        </Surface>
      </Container>
    </Layout>
  );
}

export default IndexPage;
