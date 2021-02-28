import { navigate, PageProps } from "gatsby";
import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import {
  BigLinkButton,
  ButtonSection,
  Container,
  Grow,
  Ruler,
  sizes,
  Surface,
} from "../../components/common";
import Layout from "../../components/layout";
import Category from "../../components/results-page/category";
import { getKanaByCategroy, getKanaByType } from "../../utils";

const Header = styled.h1`
  margin-bottom: 0;
`;

const ResultsPage: FunctionComponent<PageProps> = ({ location }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const locationState = location.state as any;

    if (!(locationState && locationState.results)) {
      navigate("/quiz/selection");
    } else {
      setResults(locationState.results);
    }
  }, []);

  return (
    <Layout>
      <Container size={sizes.lg}>
        <Surface>
          <Header>Results</Header>
          <Ruler />
          {getKanaByType(results).map((kanaType) => (
            <div key={kanaType.name}>
              <h2>{kanaType.name}</h2>
              {getKanaByCategroy(kanaType.kana).map((kanaCategory) => (
                <Category
                  key={kanaCategory.name}
                  category={kanaCategory.name}
                  kana={kanaCategory.kana}
                />
              ))}
            </div>
          ))}
          <ButtonSection>
            <Grow />
            <BigLinkButton to="/quiz/selection">Play again</BigLinkButton>
          </ButtonSection>
        </Surface>
      </Container>
    </Layout>
  );
};

export default ResultsPage;
