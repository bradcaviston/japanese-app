import { Link } from "gatsby";
import React, { FunctionComponent, useEffect, useState } from "react";
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
  active: boolean;
  onClick: () => void;
}

const CategoryCard: FunctionComponent<CategoryCardProps> = ({
  category,
  type,
  active,
  onClick,
}) => {
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

  return (
    <Layout>
      <Container size={sizes.lg}>
        <FullHeightSection>
          {Object.values(Types).map((type) => {
            const [allActive, setAllActive] = useState(false);

            function allFunction() {
              if (!allActive) {
                const newKana: Kana[] = [];

                kana.forEach((aKana) => {
                  if (aKana.type === type) {
                    if (
                      selectedKana.find((bKana) =>
                        aKana.category === bKana.category &&
                        aKana.type === bKana.type
                          ? true
                          : false
                      )
                    ) {
                      return;
                    }

                    newKana.push(aKana);
                  }

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
              const kanaOfType = kana.filter((aKana) => {
                if (aKana.type === type) {
                  return true;
                }

                return false;
              });

              setAllActive(
                kanaOfType.every((aKana) => {
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
              <div key={type}>
                <div>
                  <h2>{type}</h2>
                  <button onClick={() => allFunction()}>
                    {allActive ? "Remove all" : "Add all"}
                  </button>
                </div>
                <Grid>
                  {Object.values(Categories).map((category) => {
                    const selectCategory = () => {
                      const newSelectedKana = kana.filter((aKana) => {
                        if (
                          aKana.type === type &&
                          aKana.category === category
                        ) {
                          return true;
                        }

                        return false;
                      });

                      setSelectedKana([...selectedKana, ...newSelectedKana]);
                    };
                    const deselectCategory = () => {
                      const newSelectedKana = selectedKana.filter((aKana) => {
                        if (
                          aKana.type === type &&
                          aKana.category === category
                        ) {
                          return false;
                        }

                        return true;
                      });

                      setSelectedKana(newSelectedKana);
                    };

                    function onClick() {
                      if (
                        selectedKana.some((aKana) => {
                          if (
                            aKana.category === category &&
                            aKana.type === type
                          ) {
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

                    if (
                      selectedKana.some((aKana) => {
                        if (
                          aKana.category === category &&
                          aKana.type === type
                        ) {
                          return true;
                        } else {
                          return false;
                        }
                      })
                    ) {
                      return (
                        <CategoryCard
                          key={category}
                          category={category}
                          type={type}
                          active={true}
                          onClick={onClick}
                        />
                      );
                    } else {
                      return (
                        <CategoryCard
                          key={category}
                          category={category}
                          type={type}
                          active={false}
                          onClick={onClick}
                        />
                      );
                    }
                  })}
                </Grid>
              </div>
            );
          })}
          <Link to="/next" state={{ selectedKana: selectedKana }}>
            Test
          </Link>
        </FullHeightSection>
      </Container>
    </Layout>
  );
}

export default TestPage;
