import React from "react";

const Total = ({ parts }) => {
  console.log(parts);
  const exercises = parts
    .map((part) => part.exercises)
    .reduce((num, val) => num + val, 0);
  console.log(exercises);
  return (
    <>
      <p>Number of exercises {exercises}</p>
    </>
  );
};

export default Total;
