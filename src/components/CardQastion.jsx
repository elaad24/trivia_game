import React from "react";

const CardQastion = ({ answers, callback, userAnswer }) => {
  let cardColorClass = "";
  function choseClass(answer) {
    if (userAnswer && answer === userAnswer.corrct_answer) {
      return (cardColorClass = "correct");
    } else if (
      userAnswer &&
      answer === userAnswer.userAnswer &&
      !userAnswer.userCorrect
    ) {
      return (cardColorClass = "wrong");
    } else {
      return (cardColorClass = "");
    }
  }

  return (
    <div className="card">
      {answers.map((answer) => {
        choseClass(answer);
        return (
          <button
            className={"ans_button " + cardColorClass}
            value={answer}
            key={answer}
            disabled={userAnswer ? true : false}
            onClick={callback}
          >
            {answer}
          </button>
        );
      })}
    </div>
  );
};

export default CardQastion;
