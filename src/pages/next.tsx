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
  const [time, setTime] = useState(null);
  const [startTime, setStartTime] = useState(Date.now);

  useEffect(() => {
    const locationState = location.state as any;

    if (!(locationState && locationState.selectedKana.length)) {
      navigate("/test");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now() - startTime);
    }, 1);

    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  useEffect(() => {
    if (time >= 2000) {
      setStartTime(Date.now());
      dispatch({ type: "incorrect", time: time });
      setUserInput("");
    }
  }, [time]);

  useEffect(() => {
    const locationState = location.state as any;

    if (
      locationState.selectedKana.length > 0 &&
      state.finishedKana.length === locationState.selectedKana.length
    ) {
      navigate("/results", { state: { results: state.finishedKana } });
    }
  }, [state.currentKana]);

  const handleInput = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStartTime(Date.now());

    if (userInput === state.currentKana.romaji) {
      dispatch({ type: "correct", time: time });
    } else {
      dispatch({ type: "incorrect", time: time });
    }

    setUserInput("");
  };

  return (
    <Layout>
      <Container size={sizes.lg}>
        <FullHeightSection>
          <Centered>
            <Card>
              {state.currentKana && state.currentKana.incorrect && (
                <p style={{ color: "red" }}>
                  Incorrect: {state.currentKana.incorrect}
                </p>
              )}
              <p>Time: {(time / 1000).toFixed(3)}</p>
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
