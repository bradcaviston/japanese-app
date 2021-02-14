import { Link } from "gatsby";
import React, { useState } from "react";
import styled from "styled-components";
import { Container, FullHeightDiv, sizes } from "../../components/common";
import Layout from "../../components/layout";
import TypeSection from "../../components/selection-page/type-section";
import kana, { Kana, Types } from "../../data/kana";

const ButtonSection = styled.div`
  margin-top: 3rem;
`;

const NextButton = styled(Link)`
  color: white;
  background-color: #2ad484;
  border-radius: 30px;
  font-weight: 500;
  font-size: 1.5rem;
  padding: 1rem 1.5rem;
  text-decoration: none;
  float: right;
`;

interface KanaType {
  name: Types;
  kana: Kana[];
}

function getKanaByType(): KanaType[] {
  const kanaTypes: KanaType[] = [];

  Object.values(Types).forEach((type) => {
    kanaTypes.push({
      name: type,
      kana: kana.filter((aKana) => (aKana.type === type ? true : false)),
    });
  });

  return kanaTypes;
}

function SelectionPage() {
  const [selectedKana, setSelectedKana] = useState<Kana[]>([]);

  return (
    <Layout>
      <Container size={sizes.lg}>
        <FullHeightDiv>
          {getKanaByType().map((kanaType, index) => (
            <TypeSection
              key={index}
              type={kanaType.name}
              kana={kanaType.kana}
              selectedKana={selectedKana}
              setSelectedKana={setSelectedKana}
            />
          ))}
          <ButtonSection>
            <NextButton to="/quiz" state={{ selectedKana: selectedKana }}>
              Start Test
            </NextButton>
          </ButtonSection>
        </FullHeightDiv>
      </Container>
    </Layout>
  );
}

export default SelectionPage;
