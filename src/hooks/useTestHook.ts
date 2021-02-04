import _ from "lodash";
import { useReducer } from "react";

export interface StateObject {
  testKana: any[];
  finishedKana: any[];
  currentKana: {
    kana: string;
    romaji: string;
  };
}

function init(state): StateObject {
  const tempKana = [];

  if (state && state.selectedCategories.length) {
    state.selectedCategories.forEach((category) => {
      tempKana.push(...category.kana);
    });
  }

  const shuffledKana = _.shuffle(tempKana);

  return {
    testKana: shuffledKana,
    finishedKana: [],
    currentKana: shuffledKana[0],
  };
}

function correct(state: StateObject): StateObject {
  const finishedKana = [...state.finishedKana, state.currentKana];
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

function incorrect(state: StateObject): StateObject {
  const finishedKana = [...state.finishedKana];
  const testKana = state.testKana
    .filter((kana) => {
      const newKana = kana;

      if (newKana.incorrect === 2) {
        newKana.incorrect = newKana.incorrect + 1;
        newKana.failed = true;
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

function dispatch(state: StateObject, action: { type: string }) {
  switch (action.type) {
    case "correct":
      return correct(state);
    case "incorrect":
      return incorrect(state);
  }
}

function useTestHook(initialState: StateObject) {
  const reducer = useReducer(dispatch, initialState, init);

  return reducer;
}

export default useTestHook;
