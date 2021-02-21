import { PageProps } from "gatsby";
import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Ruler, sizes, Surface } from "../components/common";
import Layout from "../components/layout";

const Header = styled.h1`
  margin-bottom: 0;
`;

function getTypes(results: any[]) {
  return results
    .map((result) => result.type)
    .filter((type, index, self) => self.indexOf(type) === index);
}

function getCategories(results: any[]) {
  return results
    .map((result) => result.category)
    .filter((type, index, self) => self.indexOf(type) === index);
}

const ResultsPage: FunctionComponent<PageProps> = ({ location }) => {
  const results = (location.state as any).results as any;
  console.log(results);

  return (
    <Layout>
      <Container size={sizes.lg}>
        <Surface>
          <Header>Results</Header>
          <Ruler />
          {getTypes(results).map((type) => (
            <div key={type}>
              <h2>{type}</h2>
              {getCategories(results).map((category) => (
                <h3>{category}</h3>
              ))}
            </div>
          ))}
          {results.map((result) => (
            <div key={result.kana}>
              <h4>
                {result.kana} - {result.romaji}
              </h4>
              {result.failed && <h4>FAILED</h4>}
              {result.incorrect && <h4>incorrect: {result.incorrect}</h4>}
              {result.time &&
                result.time.map((aTime, index) => (
                  <h4 key={index}>
                    {index}: {aTime}
                  </h4>
                ))}
            </div>
          ))}
        </Surface>
      </Container>
    </Layout>
  );
};

export default ResultsPage;
