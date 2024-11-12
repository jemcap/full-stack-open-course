import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  // Generate random number to store into state

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  console.log(votes);

  // create a button that calls a function that generates a random number
  const generateQuote = () => {
    let random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  // create a copy of the votes array to mutate, and increment the index based on the current quote by 1. update votes.
  const handleVotes = () => {
    const quoteVotes = [...votes];
    quoteVotes[selected] += 1;
    setVotes(quoteVotes);
  };

  // find the Max value in the votes array as well as the index of the Max value to render the quote
  const maxVal = Math.max(...votes);
  const index = votes.indexOf(Math.max(...votes));
  console.log(index);

  return (
    <div>
      <section>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <button onClick={handleVotes}>vote</button>
        <button onClick={generateQuote}>next anecdote</button>
      </section>
      <section>
        <h1>Anecdote with the most votes</h1>
        <p>{anecdotes[index]}</p>
        <p>has {maxVal} votes</p>
      </section>
    </div>
  );
};

export default App;
