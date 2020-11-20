import React from "react";
import Comment from "./Comment"
function App() {

  const comment = {
    date: new Date(),
    text: "I hope you enjoy studying React",
    author: {
      name: "MaoMi",
      avatarUrl: "https://placekitten.com/g/64/64"
    }
  }

  return (
    <div className="app">
      <Comment
        author={comment.author}
        text={comment.text}
        date={comment.date}
      />
    </div>
  )
}

export default App;
