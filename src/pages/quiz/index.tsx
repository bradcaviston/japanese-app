import { navigate, PageProps } from "gatsby";
import React, {
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import styled, { keyframes } from "styled-components";
import {
  Container,
  sizes,
  FullHeightDiv,
  Card,
  Centered,
} from "../../components/common";
import Layout from "../../components/layout";
import useTestHook, { StateObject } from "../../hooks/useTestHook";
import { FiXCircle } from "react-icons/fi";
import Timer from "../../components/quiz-page/timer";

const QuizCard = styled(Card)`
  padding: 2rem;
`;

const KanaArea = styled.div`
  text-align: center;
  margin: 0 0 3rem 0;
`;

const test = keyframes`
  0% {
    transform: translateX(-15px);
  }
  100% {
    transform: translateX(0px);
  }
`;

const Kana = styled.h2`
  font-family: "Kosugi Maru", sans-serif;
  font-size: 3rem;
  margin: 0;
  animation: ${test} 100ms ease-in;
`;

const Input = styled.input`
  border: 2px solid #dedede;
  border-radius: 10px;
  padding: 0.5rem;
  font-size: 1.25rem;

  &:focus {
    outline: none;
  }
`;

const IncorrectArea = styled.div`
  height: 2rem;
  margin: 1rem 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const animation = keyframes`
  0% {
    transform: translateY(-5px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const IncorrectIcon = styled(FiXCircle)`
  color: red;
  font-size: 1.5rem;
  margin-left: 0.25rem;
  animation: ${animation} 100ms linear;
`;

const QuizPage: FunctionComponent<PageProps> = ({ location }) => {
  const [state, dispatch] = useTestHook(location.state as StateObject);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(Date.now);
  const [timeout, setTimeoutVariable] = useState(null);
  const maxTime = 5000;

  useEffect(() => {
    const locationState = location.state as any;

    if (!(locationState && locationState.selectedKana.length)) {
      navigate("/test");
    }
  }, []);

  useEffect(() => {
    clearTimeout(timeout);

    setTimeoutVariable(
      setTimeout(() => {
        const finalTime = maxTime;

        dispatch({ type: "incorrect", time: finalTime });

        setStartTime(Date.now());
        setUserInput("");
      }, maxTime)
    );
  }, [startTime]);

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
    const finalTime = Date.now() - startTime;

    if (userInput === state.currentKana.romaji) {
      dispatch({ type: "correct", time: finalTime });
    } else {
      dispatch({ type: "incorrect", time: finalTime });
    }

    setStartTime(Date.now());
    setUserInput("");
  };

  return (
    <Layout>
      <Container size={sizes.lg}>
        <FullHeightDiv>
          <Centered>
            <QuizCard>
              <Timer startTime={startTime} maxTime={maxTime} />
              <IncorrectArea>
                {state.currentKana &&
                  state.currentKana.incorrect &&
                  Array(state.currentKana.incorrect)
                    .fill(null)
                    .map((_, index) => <IncorrectIcon key={index} />)}
              </IncorrectArea>
              <KanaArea>
                {state.currentKana && (
                  <Kana key={state.currentKana.id}>
                    {state.currentKana.kana}
                  </Kana>
                )}
              </KanaArea>
              <form onSubmit={(event) => handleInput(event)}>
                <Input
                  type="text"
                  autoFocus
                  onBlur={(event) => event.target.focus()}
                  maxLength={3}
                  value={userInput}
                  onChange={(event) => setUserInput(event.target.value)}
                />
              </form>
            </QuizCard>
          </Centered>
        </FullHeightDiv>
      </Container>
    </Layout>
  );
};

export default QuizPage;
