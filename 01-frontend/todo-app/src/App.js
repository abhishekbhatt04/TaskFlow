// import { Component } from 'react';
import "./App.css";
import TodoApp from "./components/todo/TodoApp";

function App() {
  return (
    <div className="App">
      {/* <Counter/> */}
      {<TodoApp/>}
    </div>
  );
}

// function PlayWithProps(properties) {
//     console.log(properties);
//     console.log(properties.property1);
//     console.log(properties.property2);
//   return <div>Props</div>;
// }

// function PlayWithProps({ property1, property2 }) {  // modern way
//   console.log(property1);
//   console.log(property2);
//   return <div>Props</div>;
// }

export default App;
