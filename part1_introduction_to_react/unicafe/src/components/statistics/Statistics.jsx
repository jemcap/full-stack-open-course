import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({ ...stats }) => {
  const { good, bad, neutral, all, averageScore, positivePercentage } = stats;
  return (
    <div>
      <h1>statistics</h1>
      {!good && !neutral && !bad ? (
        <div>
          <h3>No feedback given</h3>
          <p>Click on the buttons to add data.</p>
        </div>
      ) : (
        <div>
          <table>
            <tbody>
              <StatisticLine text="Good" value={good} />
              <StatisticLine text="Neutral" value={neutral} />
              <StatisticLine text="Bad" value={bad} />
              <StatisticLine text="Total Feedback" value={all} />
              <StatisticLine text="Average" value={averageScore.toFixed(2)} />
              <StatisticLine
                text="Positive Feedback"
                value={positivePercentage.toFixed(2)}
              />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Statistics;
