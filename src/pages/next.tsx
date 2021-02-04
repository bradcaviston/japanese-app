import { navigate, PageProps } from "gatsby";
import React, {
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { Container, FullHeightSection, sizes } from "../components/common";
import Layout from "../components/layout";
import useTestHook, { StateObject } from "../hooks/useTestHook";

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Card = styled.div`
  border: 2px solid grey;
  border-radius: 15px;
  padding: 1rem;
`;

const NextPage: FunctionComponent<PageProps> = ({ location }) => {
  const [state, dispatch] = useTestHook(location.state as StateObject);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    const locationState = location.state as any;

    if (!(locationState && locationState.selectedCategories.length)) {
      navigate("/test");
    }
  }, []);

  useEffect(() => {
    if (state.currentKana === undefined) {
      navigate("/results", { state: { results: state.finishedKana } });
    }
  }, [state.currentKana]);

  const handleInput = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userInput === state.currentKana.romaji) {
      dispatch({ type: "correct" });
    } else {
      dispatch({ type: "incorrect" });
    }

    setUserInput("");
  };

  return (
    <Layout>
      <Container size={sizes.lg}>
        <FullHeightSection>
          <Centered>
            <Card>
              <h2>{state.currentKana && state.currentKana.kana}</h2>
              <form onSubmit={(event) => handleInput(event)}>
                <input
                  type="text"
                  autoFocus
                  onBlur={(event) => event.target.focus()}
                  value={userInput}
                  onChange={(event) => setUserInput(event.target.value)}
                />
              </form>
            </Card>
          </Centered>
        </FullHeightSection>
      </Container>
    </Layout>
  );
};

export default NextPage;
