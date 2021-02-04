import { Link } from "gatsby";
import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { Container, FullHeightSection, sizes } from "../components/common";
import Layout from "../components/layout";
import kana, { Categories, Kana, Types } from "../data/kana";

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

interface CategoryCardProps {
  category: string;
  type: string;
  selectedKana: Kana[];
  setSelectedKana: Dispatch<SetStateAction<Kana[]>>;
}

const CategoryCard: FunctionComponent<CategoryCardProps> = ({
  category,
  type,
  selectedKana,
  setSelectedKana,
}) => {
  const [active, setActive] = useState(false);
  const selectCategory = () => {
    const newSelectedKana = kana.filter((aKana) => {
      if (aKana.type === type && aKana.category === category) {
        return true;
      }

      return false;
    });

    setSelectedKana([...selectedKana, ...newSelectedKana]);
  };
  const deselectCategory = () => {
    const newSelectedKana = selectedKana.filter((aKana) => {
      if (aKana.type === type && aKana.category === category) {
        return false;
      }

      return true;
    });

    setSelectedKana(newSelectedKana);
    setActive(false);
  };

  function onClick() {
    if (active) {
      deselectCategory();
    } else {
      selectCategory();
    }
  }

  useEffect(() => {
    selectedKana.forEach((aKana) => {
      if (aKana.type === type && aKana.category === category) {
        setActive(true);
      }
    });

    console.log(selectedKana);
  }, [selectedKana]);

  return (
    <CategoryCardStyles active={active} onClick={() => onClick()}>
      <h3>{category}</h3>
      <Flex>
        <table>
          <TableBody>
            {kana
              .filter((aKana) => {
                if (aKana.type === type && aKana.category === category) {
                  return true;
                }

                return false;
              })
              .map((kana) => {
                return (
                  <tr key={kana.id}>
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
};

function TestPage() {
  const [selectedKana, setSelectedKana] = useState<Kana[]>([]);

  function addAll(type) {
    const newKana: Kana[] = [];

    kana.forEach((aKana) => {
      if (aKana.type === type) {
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
      }
    });

    setSelectedKana([...selectedKana, ...newKana]);
  }

  return (
    <Layout>
      <Container size={sizes.lg}>
        <FullHeightSection>
          {Object.values(Types).map((type) => (
            <div key={type}>
              <div>
                <h2>{type}</h2>
                <button onClick={() => addAll(type)}>Add all</button>
              </div>
              <Grid>
                {Object.values(Categories).map((category) => (
                  <CategoryCard
                    key={category}
                    category={category}
                    type={type}
                    selectedKana={selectedKana}
                    setSelectedKana={setSelectedKana}
                  />
                ))}
              </Grid>
            </div>
          ))}
          <Link to="/next" state={{ selectedKana: selectedKana }}>
            Test
          </Link>
        </FullHeightSection>
      </Container>
    </Layout>
  );
}

export default TestPage;
