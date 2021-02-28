import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { Kana } from "../../data/kana";
import { getKanaByCategroy } from "../../utils";
import { Button, Ruler } from "../common";
import Category from "./category";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1rem;
`;

const Header = styled.h2`
  font-size: 2.5rem;
  margin: 0;
`;

const Top = styled.div`
  margin: 2rem 0;
`;

const TopFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface TypeSectionProps {
  type: string;
  kana: Kana[];
  selectedKana: Kana[];
  setSelectedKana: (kana: Kana[]) => void;
}

const TypeSection: FunctionComponent<TypeSectionProps> = ({
  type,
  kana,
  selectedKana,
  setSelectedKana,
}) => {
  const [allActive, setAllActive] = useState(false);

  function allFunction() {
    if (!allActive) {
      const newKana: Kana[] = [];

      kana.forEach((aKana) => {
        if (
          selectedKana.find((bKana) =>
            aKana.category === bKana.category && aKana.type === bKana.type
              ? true
              : false
          )
        ) {
          return;
        }

        newKana.push(aKana);

        setSelectedKana([...selectedKana, ...newKana]);
      });
    } else {
      const filteredSelection = selectedKana.filter((aKana) => {
        if (aKana.type === type) {
          return false;
        }

        return true;
      });

      setSelectedKana(filteredSelection);
    }
  }

  useEffect(() => {
    setAllActive(
      kana.every((aKana) => {
        return selectedKana.some((bKana) => {
          if (aKana.id === bKana.id) {
            return true;
          }

          return false;
        });
      })
    );
  }, [selectedKana]);

  return (
    <section>
      <Top>
        <TopFlex>
          <Header>{type}</Header>
          <Button onClick={() => allFunction()}>
            {allActive ? "Remove all" : "Add all"}
          </Button>
        </TopFlex>
        <Ruler />
      </Top>
      <Grid>
        {getKanaByCategroy(kana).map((kanaCategory) => (
          <Category
            key={kanaCategory.name}
            selectedKana={selectedKana}
            setSelectedKana={setSelectedKana}
            kana={kanaCategory.kana}
            category={kanaCategory.name}
          />
        ))}
      </Grid>
    </section>
  );
};

export default TypeSection;
