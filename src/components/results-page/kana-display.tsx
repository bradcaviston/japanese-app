import Tippy from "@tippyjs/react";
import React, { FunctionComponent } from "react";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import styled from "styled-components";
import "tippy.js/animations/scale.css";

const KanaArea = styled.div`
  font-family: "Kosugi Maru", sans-serif;
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  padding: 0.2rem;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.cardContrast};

  &:hover {
    background-color: ${({ theme }) => theme.cardContrast};
  }
`;

const Romaji = styled.span`
  font-family: "Rubik", sans-serif;
`;

const IconArea = styled.span<{ failed: boolean }>`
  font-size: 1.5rem;
  height: 1.5rem;
  margin-left: 0.5rem;
  color: ${(props) => (props.failed ? "red" : props.theme.green)};
`;

const Tooltip = styled(Tippy)`
  background-color: ${({ theme }) => theme.card};
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.cardContrast};
`;

const ToolTipHeader = styled.h4`
  font-weight: 500;
  margin: 0 0 0.5rem 0;
`;

function isFailedAttempt(attemptNumber, totalAttempts, failed) {
  if (failed) {
    return failed;
  }

  if (attemptNumber + 1 < totalAttempts) {
    return true;
  }

  return false;
}

function ToolTipArea({ kana }) {
  return (
    <>
      <ToolTipHeader>Attempts</ToolTipHeader>
      <table>
        <tbody>
          {kana.time &&
            kana.time.map((time, index, array) => {
              const failedAttempt = isFailedAttempt(
                index,
                array.length,
                kana.failed
              );

              return (
                <tr key={index}>
                  <td>{(time / 1000).toFixed(2)}s</td>
                  <td>
                    <IconArea failed={failedAttempt}>
                      {failedAttempt ? <HiXCircle /> : <HiCheckCircle />}
                    </IconArea>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

interface KanaDisplayProps {
  kana: any;
}

const KanaDisplay: FunctionComponent<KanaDisplayProps> = ({ kana }) => {
  return (
    <Tooltip
      content={<ToolTipArea kana={kana} />}
      placement="bottom"
      animation="scale"
    >
      <KanaArea>
        <span>
          {`${kana.kana} / `}
          <Romaji>{kana.romaji}</Romaji>
        </span>
        <IconArea failed={kana.failed}>
          {kana.failed ? <HiXCircle /> : <HiCheckCircle />}
        </IconArea>
      </KanaArea>
    </Tooltip>
  );
};

export default KanaDisplay;
