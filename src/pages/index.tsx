import { Link } from "gatsby";
import React from "react";
import { Container, sizes } from "../components/common";
import Layout from "../components/layout";

function IndexPage() {
  return (
    <Layout>
      <Container size={sizes.lg}>
        <h1>Test</h1>
        <Link to="/quiz/selection">Start</Link>
      </Container>
    </Layout>
  );
}

export default IndexPage;
