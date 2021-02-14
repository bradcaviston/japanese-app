import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { Kana } from "../../data/kana";
import { Card } from "../common";

const CategoryCard = styled(Card)`
  position: relative;
  border-radius: 15px;
  display: flex;
  cursor: pointer;

  &:hover {
    box-shadow: 4px 4px 20px 0px #0000000d;
  }
`;

const BorderDiv = styled.div<{ active: boolean }>`
  position: absolute;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  border: ${(props) => (props.active ? "2px solid #2AD484" : "unset")};
  border-radius: 15px;
`;

const TypeArea = styled.div<{ active: boolean }>`
  min-width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px 0 0 15px;
  background-color: ${(props) => (props.active ? "#2AD484" : "#eaeaea")};
  color: ${(props) => (props.active ? "white" : "black")};
  padding: 0.7rem;

  h3 {
    text-transform: capitalize;
    font-weight: 500;
    margin: 0;
  }
`;

const KanaArea = styled.div`
  flex-grow: 2;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.7rem;
  font-family: "Kosugi Maru", sans-serif;
`;

interface CategoryProps {
  category: string;
  kana: Kana[];
  selectedKana: Kana[];
  setSelectedKana: (kana: Kana[]) => void;
}

const Category: FunctionComponent<CategoryProps> = ({
  category,
  kana,
  selectedKana,
  setSelectedKana,
}) => {
  const [active, setActive] = useState(false);
  const selectCategory = () => {
    setSelectedKana([...selectedKana, ...kana]);
  };
  const deselectCategory = () => {
    const newSelectedKana = selectedKana.filter((aKana) => {
      if (kana.some((bKana) => aKana.id === bKana.id)) {
        return false;
      }

      return true;
    });

    setSelectedKana(newSelectedKana);
  };

  function onClick() {
    if (
      selectedKana.some((aKana) => {
        if (kana.some((bKana) => aKana.id === bKana.id)) {
          return true;
        } else {
          return false;
        }
      })
    ) {
      deselectCategory();
    } else {
      selectCategory();
    }
  }

  useEffect(() => {
    if (
      selectedKana.some((aKana) => {
        if (kana.some((bKana) => aKana.id === bKana.id)) {
          return true;
        } else {
          return false;
        }
      })
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [selectedKana]);

  return (
    <CategoryCard onClick={() => onClick()}>
      <BorderDiv active={active} />
      <TypeArea active={active}>
        <h3>{category}</h3>
      </TypeArea>
      <KanaArea>
        {kana.map((kana) => {
          return <span key={kana.id}>{kana.kana}</span>;
        })}
      </KanaArea>
    </CategoryCard>
  );
};

export default Category;
