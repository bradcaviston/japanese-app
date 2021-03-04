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
          <p>
            Click begin to go to the selection page. There you can pick which
            kana you wish to study. Once you have picked your kana you can click
            “Start Quiz” to start the quiz. The quiz will present a random kana
            from your selection and give you five seconds to type in the
            matching romaji for the kana. If you type in the wrong romaji or you
            run out of time you will get an incorrect mark. You will have three
            total opportunities to answer the kana correctly before you fail
            that kana.
          </p>
          <p>
            Once you’ve finished the test you can see your results on the
            results page where you can hover over any result to see the time it
            took you to answer the kana correctly and how many attempts it took.
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
