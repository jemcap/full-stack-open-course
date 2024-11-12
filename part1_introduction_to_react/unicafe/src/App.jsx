import { useState } from "react";
import Statistics from "./components/statistics/Statistics";
import Button from "./components/buttons/Button";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    setGood((prev) => prev + 1);
  };
  const handleClickNeutral = () => {
    setNeutral((prev) => prev + 1);
  };
  const handleClickBad = () => {
    setBad((prev) => prev + 1);
  };

  const all = bad + neutral + good;
  const averageScore = all / 3;
  const positivePercentage = (good / all) * 100;

  return (
    <>
      <div>
        <h1>give feedback</h1>
        <div>
          <Button handleClick={handleClickGood} text="Good" />
          <Button handleClick={handleClickNeutral} text="Neutral" />
          <Button handleClick={handleClickBad} text="Bad" />
        </div>
      </div>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        all={all}
        averageScore={averageScore}
        positivePercentage={positivePercentage}
      />
    </>
  );
};

export default App;
