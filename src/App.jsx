import "./App.css";

//functions

import { API } from "./API";

// components
import CardComponent from "./components/CardQastion";

// types
import { useState } from "react";
import store from "./redux/store";
import {
  addLastGameScore,
  addUserAnswer,
  addWrongAnswer,
} from "./redux/actions/gameInfo";

// set state to use in app
function App() {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [qestions, setQestions] = useState(null);
  const [gameOver, setGameOver] = useState(true);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnsers] = useState([]);
  const [level, setLevel] = useState("easy");
  const [type, setType] = useState("");

  const numberOfQestion = 10;

  // function to operate app

  // start triva reset all the state and start over
  const startTriva = async () => {
    setLoading(true);
    setGameOver(false);
    setQestions(await API(numberOfQestion, level, type));
    setNumber(0);

    setScore(0);
    setUserAnsers([]);
    setLoading(false);
  };

  // next qestion run only when clicked on the next qestion button
  //just change the number-state and it's all it take to change the qestion
  const nextQestion = async () => {
    if (number + 1 === numberOfQestion) {
      setLoading(true);
      setGameOver(true);

      setNumber(number + 1);

      setLoading(false);
    } else {
      setNumber(number + 1);
    }
  };

  // check qestion take the user ans and the correct ans and compre
  // in use as the call back in the card component

  const CheckQestion = async (e) => {
    if (!gameOver) {
      const userAnswer = e.target.value;
      const corrct_answer = qestions[number].correct_answer;
      const userCorrect = userAnswer === corrct_answer;
      if (userAnswer === corrct_answer) {
        setScore(score + 10);
        const ansObject = {
          qestion: qestions[number],
          corrct_answer,
          userAnswer,
          userCorrect,
        };
        await store.dispatch(addUserAnswer(ansObject));
        setUserAnsers([...userAnswers, ansObject]);
      } else {
        const ansObject = {
          qestion: qestions[number],
          corrct_answer,
          userAnswer,
          userCorrect,
        };
        await store.dispatch(addUserAnswer(ansObject));
        await store.dispatch(addWrongAnswer(ansObject));
        setUserAnsers([...userAnswers, ansObject]);
      }

      if (userAnswers.length + 1 === numberOfQestion) {
        setTimeout(
          [setLoading(true), setGameOver(true), setLoading(false)],
          30000
        );
      }
    }
  };
  // add to redux store the game score
  if (gameOver && score !== 0) {
    store.dispatch(addLastGameScore(score));
  }

  // simple function to set the game paramters
  const handleDifficulty = (lvl) => {
    setLevel(lvl);
  };
  const handleQestionType = (type) => {
    setType(type);
  };

  return (
    <div className="main">
      <h1 className="header">quiz</h1>
      {/* from here game parametrs form  */}
      {gameOver ? (
        <>
          <h2 className="center miniSpacing">set parameters</h2>
          <div className="gamesParams">
            <form className="inGamesParams">
              <fieldset className="fieldset">
                <legend>Difficulty:</legend>
                <input
                  onClick={() => handleDifficulty("easy")}
                  type="radio"
                  id="easy"
                  name="Difficulty"
                  value="easy"
                />
                <label htmlFor="easy">EASY</label>
                <br />
                <input
                  type="radio"
                  id="medium"
                  name="Difficulty"
                  value="medium"
                  onClick={() => handleDifficulty("medium")}
                />
                <label htmlFor="medium">MEDIUM</label>
                <br />
                <input
                  type="radio"
                  id="hard"
                  name="Difficulty"
                  value="hard"
                  onClick={() => handleDifficulty("hard")}
                />
                <label htmlFor="hard">HARD</label>
              </fieldset>
            </form>
            <form className="inGamesParams">
              <fieldset className="fieldset">
                <legend>QestionType:</legend>
                <input
                  type="radio"
                  id="both"
                  name="QestionType"
                  value=""
                  onClick={() => handleQestionType("")}
                />
                <label htmlFor="both">Both</label>
                <br />
                <input
                  type="radio"
                  id="multiple"
                  name="QestionType"
                  value="multiple"
                  onClick={() => handleQestionType("multiple")}
                />
                <label htmlFor="multiple">MULTIPLE</label>
                <br />
                <input
                  type="radio"
                  id="boolean"
                  name="QestionType"
                  value="boolean"
                  onClick={() => handleQestionType("boolean")}
                />
                <label htmlFor="boolean">BOOLEAN</label>
                <br />
              </fieldset>
            </form>
          </div>
        </>
      ) : (
        ""
      )}
      {/* till here game parametrs form  */}
      {/* from here display in  game parametrs   */}
      {qestions && !gameOver && !loading ? (
        <>
          <div className="stf_global">
            <div className="runningGameParams">
              <p>Difficulty : {level}</p>
              <p>Qestion Type : {type === "" ? "both" : type}</p>
            </div>
            <div className="small_headers">
              <p className="">score - {score}</p>
              <p className="">
                qestion - {number + 1}/{numberOfQestion}
              </p>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      {/* till here display in  game parametrs   */}
      {/* game start button  */}
      {gameOver ? (
        <button className="operation_btn" onClick={startTriva}>
          start trivia
        </button>
      ) : (
        ""
      )}
      {/* from here card component */}
      {qestions && !gameOver && !loading ? (
        <>
          <p className="qestion">{qestions[number].question}</p>
          <CardComponent
            className="card_component"
            answers={qestions[number].answerss}
            callback={CheckQestion}
            userAnswer={userAnswers[number]}
          />
        </>
      ) : (
        ""
      )}
      {/* till here card component */}
      {/* next qestion btn */}
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number + 1 !== numberOfQestion ? (
        <button className="operation_btn" onClick={nextQestion}>
          next question
        </button>
      ) : (
        ""
      )}
      {/* last game score header  */}
      {gameOver && score !== 0 && userAnswers ? (
        <h2 className="lastGameScore">last game score : {score} points</h2>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
