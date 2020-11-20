import React from 'react';
import ReactDOM from 'react-dom';

function UserGreeting(props){
  return <h2>欢迎归来！</h2>
}
function GuestGreeting(prpos){
  return <h2>请登录.</h2>
}

ReactDOM.render(
  <React.StrictMode>
    
  </React.StrictMode>,
  document.getElementById('root')
);

