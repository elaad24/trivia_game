import { shaffle } from "./utils";

// posible  category , dificalty,type

// another possibility to set the game parameters
// the old way

export const Difficulty = { EASY: "easy", MEDIUM: "medium", HARD: "hard" };
export const QestionType = { MULTIPLE: "multiple", BOOLEAN: "boolean" };

export const API = async (Number, Difficulty, Type = null, Category = null) => {
  const endpoint = `https://opentdb.com/api.php?amount=${Number}&${
    Category != null ? Category : ""
  }&difficulty=${Difficulty}&type=${Type != null ? Type : ""}`;

  const data = await (await fetch(endpoint)).json();

  // take the data and copie it and add a "answerss -meaning- shffled answers in one place  "
  return data.results.map((qustionData) => ({
    ...qustionData,
    answerss: shaffle([
      ...qustionData.incorrect_answers,
      qustionData.correct_answer,
    ]),
  }));
};
