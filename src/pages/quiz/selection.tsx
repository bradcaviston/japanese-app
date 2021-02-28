import React, { useState } from "react";
import styled from "styled-components";
import {
  BigLinkButton,
  ButtonSection,
  Container,
  Grow,
  sizes,
  Surface,
} from "../../components/common";
import Layout from "../../components/layout";
import TypeSection from "../../components/selection-page/type-section";
import kana, { Kana } from "../../data/kana";
import { getKanaByType } from "../../utils";

const DisableabledBigLinkButton = styled(BigLinkButton)<{ enabled: number }>`
  ${(props) => {
    if (props.enabled !== 1) {
      return `
        color: ${props.theme.disabledText};
        background-color: ${props.theme.disabledBackground};
        pointer-events: none;
        cursor: default;
      `;
    }
  }}
`;

function SelectionPage() {
  const [selectedKana, setSelectedKana] = useState<Kana[]>([]);

  return (
    <Layout>
      <Container size={sizes.lg}>
        <Surface>
          {getKanaByType(kana).map((kanaType, index) => (
            <TypeSection
              key={index}
              type={kanaType.name}
              kana={kanaType.kana}
              selectedKana={selectedKana}
              setSelectedKana={setSelectedKana}
            />
          ))}
          <ButtonSection>
            <Grow />
            <DisableabledBigLinkButton
              enabled={selectedKana.length ? 1 : 0}
              to="/quiz"
              state={{ selectedKana: selectedKana }}
            >
              Start Quiz
            </DisableabledBigLinkButton>
          </ButtonSection>
        </Surface>
      </Container>
    </Layout>
  );
}

export default SelectionPage;
