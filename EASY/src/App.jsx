import React, { useState } from "react";
// Bringing in React and useState so we can create a component with state (to track the count).

function CounterApp() {
  // Setting up the count variable and a way to update it (starts at 0).
  const [count, setCount] = useState(0);

  function up() {
    // This increases the count by 1 when the button is clicked.
    setCount(count + 1);
  }

  function down() {
    // This decreases the count by 1 when the button is clicked.
    setCount(count - 1);
  }

  return (
    <div className="counter-app">
      {/* Showing the current counter value. */}
      <h1>Counter: {count}</h1>

      {/* A button to increase the counter. */}
      <button onClick={up}>Up</button>

      {/* A button to decrease the counter. */}
      <button onClick={down}>Down</button>
    </div>
  );
}

export default CounterApp;
