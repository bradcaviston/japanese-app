import { navigate, PageProps } from "gatsby";
import React, {
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { Container, sizes, FullHeightDiv, Card } from "../../components/common";
import Layout from "../../components/layout";
import useTestHook, { StateObject } from "../../hooks/useTestHook";
import { FiXCircle } from "react-icons/fi";

const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const QuizCard = styled(Card)`
  padding: 2rem;
`;

const KanaArea = styled.div`
  text-align: center;
  margin: 0 0 3rem 0;
`;

const Kana = styled.h2`
  font-family: "Kosugi Maru", sans-serif;
  font-size: 3rem;
  margin: 0;
`;

const Timer = styled.div`
  height: 1rem;
  width: 100%;
  border-radius: 15px;
  background-color: #d3f6e6;
`;

const Time = styled.div`
  height: 1rem;
  width: 90%;
  border-radius: 15px;
  background-color: #2ad484;
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

const IncorrectIcon = styled(FiXCircle)`
  color: red;
  font-size: 1.5rem;
  margin-left: 0.25rem;
`;

const QuizPage: FunctionComponent<PageProps> = ({ location }) => {
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
  /*
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
  */

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
        <FullHeightDiv>
          <Centered>
            <QuizCard>
              <Timer>
                <Time />
              </Timer>
              <IncorrectArea>
                {state.currentKana.incorrect &&
                  Array(state.currentKana.incorrect)
                    .fill("test")
                    .map((test, index) => <IncorrectIcon key={index} />)}
              </IncorrectArea>
              <KanaArea>
                <Kana>{state.currentKana.kana}</Kana>
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
