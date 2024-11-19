import React from "react";

const Course = ({ course }) => {
  return (
    <>
      <h1>Web development curriculum</h1>
      {course.map((item) => {
        const { name, id, parts } = item;
        console.log(parts);
        const totalSum = parts.reduce((acc, val) => acc + val.exercises, 0);
        return (
          <div key={id}>
            <div>
              <h2>{name}</h2>
            </div>

            {parts.map((part) => {
              const { id, name, exercises } = part;
              return (
                <div key={id}>
                  <p>
                    {name} {exercises}
                  </p>
                </div>
              );
            })}
            <p>
              <b>total of {totalSum} exercises</b>
            </p>
          </div>
        );
      })}
    </>
  );
  //   const totalExercises = parts.reduce((sum, val) => sum + val.exercises, 0);
  //   console.log(parts);
  //   return (
  //     <div>
  //       <h1>{name}</h1>
  //       {parts.map((part) => {
  //         const { id, name, exercises } = part;
  //         console.log(exercises);
  //         return (
  //           <>
  //             <div key={id}>
  //               <p>
  //                 {name} {exercises}
  //               </p>
  //             </div>
  //           </>
  //         );
  //       })}
  //       {/* <h3>total of {totalExercises} exercises</h3> */}
  //     </div>
  //   );
};

export default Course;
