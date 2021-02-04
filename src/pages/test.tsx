import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container, FullHeightSection, sizes } from "../components/common";
import Layout from "../components/layout";
import kana from "../data/kana-json.json";

const CategoryCardStyles = styled.div<{ active: boolean }>`
  border: ${(props) =>
    props.active ? "3px solid #66ff58" : "3px solid #ececec"};
  border-radius: 15px;
  padding: 0.5rem;
  cursor: pointer;
  h3 {
    text-align: center;
    margin: 0 0 1rem;
  }
  table {
    width: 100%;
    text-align: center;
    border-spacing: 0;
  }
  &:hover {
    box-shadow: 4px 4px 20px 0px #0000000d;
  }
`;

const TableBody = styled.tbody`
  td {
    border-bottom: 1px solid #ececec;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
  gap: 1rem;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 2.17rem);
`;

function CategoryCard({ category, selectedCategories, setSelectedCategories }) {
  const [active, setActive] = useState(false);
  const selectCategory = (category: object) => {
    setSelectedCategories([...selectedCategories, category]);
  };
  const deselectCategory = (category: object) => {
    const newSelectedCategories = [...selectedCategories];
    const index = selectedCategories.indexOf(category);

    if (index !== -1) {
      newSelectedCategories.splice(index, 1);
      setSelectedCategories(newSelectedCategories);
    }

    setActive(false);
  };

  function onClick() {
    if (active) {
      deselectCategory(category);
    } else {
      selectCategory(category);
    }
  }

  useEffect(() => {
    selectedCategories.forEach((selectedCategory) => {
      if (category.kana[0].kana === selectedCategory.kana[0].kana) {
        setActive(true);
      }
    });
  }, [selectedCategories]);

  return (
    <CategoryCardStyles active={active} onClick={() => onClick()}>
      <h3>{category.name}</h3>
      <Flex>
        <table>
          <TableBody>
            {category.kana.map((kana) => {
              return (
                <tr key={kana.kana}>
                  <td>{kana.romaji}</td>
                  <td>{kana.kana}</td>
                </tr>
              );
            })}
          </TableBody>
        </table>
      </Flex>
    </CategoryCardStyles>
  );
}

function TestPage() {
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);

  function addAll(type) {
    setSelectedCategories([...selectedCategories, ...type.categories]);
  }

  return (
    <Layout>
      <Container size={sizes.lg}>
        <FullHeightSection>
          {/*kana.map((type) => (
            <div key={type.name}>
              <div>
                <h2>{type.name}</h2>
                <button onClick={() => addAll(type)}>Add all</button>
              </div>
              <Grid>
                {type.categories.map((category) => (
                  <CategoryCard
                    key={category.name}
                    category={category}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                  />
                ))}
              </Grid>
            </div>
                ))*/}
          <Link to="/next" state={{ selectedCategories: selectedCategories }}>
            Test
          </Link>
        </FullHeightSection>
      </Container>
    </Layout>
  );
}

export default TestPage;
