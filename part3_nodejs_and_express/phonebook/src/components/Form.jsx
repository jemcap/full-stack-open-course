import React from "react";

const Form = ({ ...props }) => {
  const { submitFn, name, setNewName, number, setNumber } = props;
  return (
    <>
      <form onSubmit={submitFn}>
        <div>
          <div>
            name:
            <input value={name} onChange={(e) => setNewName(e.target.value)} />
          </div>
          <div>
            number:
            <input
              type="tel"
              required
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default Form;
