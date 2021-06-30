import { ADDUSERANSWER, ADDLASTGAMESCORE, ADDWRONGANSWER } from "./actionTypes";

// action to save info from game

export const addUserAnswer = (userAnswer) => ({
  type: ADDUSERANSWER,
  payload: { userAnswer },
});
export const addWrongAnswer = (wrongAnswer) => ({
  type: ADDWRONGANSWER,
  payload: { wrongAnswer },
});
export const addLastGameScore = (lastGameScore) => ({
  type: ADDLASTGAMESCORE,
  payload: { lastGameScore },
});
