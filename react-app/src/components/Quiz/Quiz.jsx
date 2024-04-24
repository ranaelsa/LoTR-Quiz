import { useState } from "react";
import { resultInitial } from "../../constants"
import "./Quiz.css";
import Timer from "../Timer/Timer";

const Quiz = ({ questions }) => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitial);
    const [showScoreboard,  setShowScoreboard] = useState(false);
    const [resetTimer, setResetTimer] = useState(true);

    const { question, choices, correctAnswer } = questions[currentQuestion];

    const onAnswerClick = (answer, index) => {
        setAnswerIdx(index);
        if(answer === correctAnswer) {
            setAnswer(true);
        } else {
            setAnswer(false);
        }

    };

    const onClickNext = () => {
        setAnswerIdx(null);
        setResetTimer(false);
        setResult((prev) => 
            answer 
            ? {
                ...prev,
                score: prev.score + 1,
                correctAnswers: prev.correctAnswers + 1,
            } : {
                ...prev,
                incorrectAnswers: prev.incorrectAnswers + 1,
            }
        );

        if (currentQuestion !== questions.length - 1)  {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setCurrentQuestion(0);
            setShowScoreboard(true);
        }

        setAnswer(false);

        setTimeout(() => {
          setResetTimer(true);
        });

        
    };

    const onTryAgain = () => {
        setResult(resultInitial);
        setShowScoreboard(false);
    };

    const timerUp = () => {
        onClickNext();
    };

    return (
      <div className="container">
        {!showScoreboard ? (
          <>
            <div className="header-quiz">
              <span>{currentQuestion + 1}</span>
              <span className="total-questions">/{questions.length}</span>
              {resetTimer && <Timer duration={50} onTimerUp = {timerUp} />}
            </div>

            <div className="question-container">
              <div className="question">{question}</div>

              <ul className="choices">
                {choices.map((answer, index) => (
                  <li
                    onClick={() => onAnswerClick(answer, index)}
                    key={answer}
                    className={answerIdx === index ? "selected-answer" : null}
                  >
                    {answer}
                  </li>
                ))}
              </ul>

              <div className="footer">
                <button onClick={onClickNext} disabled={answerIdx === null}>
                  {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="scoreboard-container">
            <div className="header-quiz">Result</div>
            <p className="score">
              Score: {result.score}/{questions.length} ({Math.round
              ((result.score / questions.length) * 100)}%)
            </p>
            <p>
              {(result.score / questions.length) * 100 > 75
                ? "Well done! It is clear you know much about LoTR."
                : (result.score / questions.length) * 100 > 50
                ? "Not bad! Looks like you know many things about LoTR."
                : "Nice try! Looks like your memory can be refreshed on the series! Binge watch/read time?"}
            </p>
            <button onClick={onTryAgain}>Try again</button>
          </div>
        )}
      </div>
    );
};

export default Quiz;