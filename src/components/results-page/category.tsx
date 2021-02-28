import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Kana } from "../../data/kana";
import KanaDisplay from "./kana-display";

const CategoryCard = styled.div`
  position: relative;
  border-radius: 15px;
  display: flex;
  border: 2px solid ${({ theme }) => theme.cardContrast};
  overflow: hidden;
  margin-bottom: 1rem;
  background-color: ${({ theme }) => theme.card};
`;

const TypeArea = styled.div`
  min-width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.cardContrast};
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
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  padding: 0rem 0.5rem;
`;

interface CategoryProps {
  category: string;
  kana: Kana[];
}

const Category: FunctionComponent<CategoryProps> = ({ category, kana }) => {
  return (
    <CategoryCard>
      <TypeArea>
        <h3>{category}</h3>
      </TypeArea>
      <KanaArea>
        {kana.map((kana) => {
          return <KanaDisplay key={kana.id} kana={kana} />;
        })}
      </KanaArea>
    </CategoryCard>
  );
};

export default Category;
