import { PageProps } from "gatsby";
import React, { FunctionComponent, useEffect, useState } from "react";
import { Container, FullHeightDiv, sizes } from "../components/common";
import Layout from "../components/layout";

const ResultsPage: FunctionComponent<PageProps> = ({ location }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const state = location.state as any;

    if (state && state.results) {
      setResults([...state.results]);
    }
  }, [location]);

  return (
    <Layout>
      <Container size={sizes.lg}>
        <FullHeightDiv>
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
        </FullHeightDiv>
      </Container>
    </Layout>
  );
};

export default ResultsPage;
