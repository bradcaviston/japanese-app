import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

const TimerContainer = styled.div`
  height: 1rem;
  width: 100%;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.cardContrast};
  overflow: hidden;
`;

const animation = keyframes`
  0% {
    transform: translateX(0%);
    background-color: #00ff88;
  }
  50% {
    background-color: #fbff00;
  }
  100% {
    transform: translateX(-100%);
    background-color: #ff0000;
  }
`;

const animationCss = (props) => css`
  animation: ${animation} ${props.maxTime}ms linear;
`;

const Time = styled.div<{ maxTime: number }>`
  height: 1rem;
  width: 100%;
  border-radius: 15px;
  ${animationCss}
`;

function Timer({ startTime, maxTime }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(!animate);
  }, [startTime]);

  return (
    <TimerContainer>
      {animate && <Time maxTime={maxTime} />}
      {!animate && <Time maxTime={maxTime} />}
    </TimerContainer>
  );
}

export default Timer;
