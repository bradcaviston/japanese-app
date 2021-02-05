import _ from "lodash";
import { useReducer } from "react";
import { Kana } from "../data/kana";

export interface StateObject {
  testKana: any[];
  finishedKana: any[];
  currentKana: any;
}

function init(state): StateObject {
  const tempKana = [];

  if (state && state.selectedKana.length) {
    tempKana.push(...state.selectedKana);
  }

  const shuffledKana = _.shuffle(tempKana);

  return {
    testKana: shuffledKana,
    finishedKana: [],
    currentKana: shuffledKana[0],
  };
}

function correct(state: StateObject, time: number): StateObject {
  const aFinishedKana = state.currentKana;

  if (aFinishedKana.time) {
    aFinishedKana.time.push(time);
  } else {
    aFinishedKana.time = [time];
  }

  const finishedKana = [...state.finishedKana, aFinishedKana];
  const testKana = state.testKana.filter((value) => {
    if (value === state.currentKana) {
      return false;
    }

    return true;
  });

  return {
    testKana,
    finishedKana,
    currentKana: testKana[0],
  };
}

function incorrect(state: StateObject, time: number): StateObject {
  const finishedKana = [...state.finishedKana];
  const testKana = state.testKana
    .filter((kana) => {
      const newKana = kana;

      if (newKana.incorrect === 2) {
        newKana.incorrect = newKana.incorrect + 1;
        newKana.failed = true;

        if (newKana.time) {
          newKana.time.push(time);
        } else {
          newKana.time = [time];
        }

        finishedKana.push(newKana);
        return false;
      }

      return true;
    })
    .map((kana) => {
      const newKana = kana;

      if (newKana.kana === state.currentKana.kana) {
        if (newKana.incorrect) {
          newKana.incorrect = newKana.incorrect + 1;
        } else {
          newKana.incorrect = 1;
        }

        if (newKana.time) {
          newKana.time.push(time);
        } else {
          newKana.time = [time];
        }
      }

      return newKana;
    });

  const shuffledKana = _.shuffle(testKana);

  return {
    testKana: shuffledKana,
    finishedKana: finishedKana,
    currentKana: shuffledKana[0],
  };
}

function dispatch(state: StateObject, action: { type: string; time: number }) {
  switch (action.type) {
    case "correct":
      return correct(state, action.time);
    case "incorrect":
      return incorrect(state, action.time);
  }
}

function useTestHook(initialState: StateObject) {
  const reducer = useReducer(dispatch, initialState, init);

  return reducer;
}

export default useTestHook;
