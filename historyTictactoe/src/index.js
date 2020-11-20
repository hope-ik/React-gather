import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Game from "./page/game"

// function tick() {
//   const element = (
//       <div>
//           <h1>Hello,World!</h1>
//           <h2>It,is{new Date().toLocaleTimeString()}</h2>
//       </div>
//   )
//   ReactDOM.render(element,document.getElementById("root"))
// }
// setInterval(tick,1000);

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('element')
);
