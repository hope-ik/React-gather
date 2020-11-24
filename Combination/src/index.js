import React from 'react';
import ReactDOM from 'react-dom';
import "./App.css";

//包含关系
function Element(props) {
  return (
    <div className={'Element-' + props.color}>
      {props.children}
    </div>
  )
}

function WelcomeDialog(props) {
  return (
    <Element color="blue">
      <h1 className="title">
        Welcome,MyWord
      </h1>
      <p className="Dialog-message">
        Thank you for visiting my world
      </p>
    </Element>
  )
}

//少数情况下，你可能需要在一个组件中预留出几个“洞”。这种情况下，我们可以不使用 children，而是自行约定：将所需内容传入 props，并使用相应的 prop。
function Contacts(props) {
  return <div className="Contacts"></div>
}
function Chat(props) {
  return <div className="chat"></div>
}
function Vessel(props) {
  return (
    <div className="vessel">
      <div className="vessel-left">
        {props.left}
      </div>
      <div className="vessel-right">
        {props.right}
      </div>
    </div>
  )
}

//特例关系
// 有些时候，我们会把一些组件看作是其他组件的特殊实例，比如 MessagebOX 可以说是 Message 的特殊实例。
// 在 React 中，我们也可以通过组合来实现这一点。“特殊”组件可以通过 props 定制并渲染“一般”组件：

function Message(p) {
  return (
    <div>
      <h1>{p.title}</h1>
      <p>
        {p.message}
      </p>
    </div>
  )
}
function MessagebOX(p) {
  return (
    <Message
      title="Welcome"
      message="Thank you for visiting our spacecraft!"
    />
  )
}


//组合也同样适用于以 class 形式定义的组件。

//我们建议这些组件使用一个特殊的 children prop 来将他们的子组件传递到渲染结果中!
//我们建议这些组件使用一个特殊的 children prop 来将他们的子组件传递到渲染结果中!
//我们建议这些组件使用一个特殊的 children prop 来将他们的子组件传递到渲染结果中!
function Copywriting(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.message}</p>
      {props.children}
    </div>
  )
}
class SignUpFor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
  }
  handleChange(e) {
    this.setState({ value: e.target.value })
  }
  handleSignUp(e) {
    alert(`欢迎加入 ${this.state.value}!`);
    this.setState({
      value:''
    })
  }

  render() {
    return (
      <Copywriting title="Space travel program" message="How should we refer to you?">
        <input
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSignUp}>sign in Up!</button>
      </Copywriting>
    )
  }
}



ReactDOM.render(
  <React.StrictMode>
    <div>
      <WelcomeDialog />
      <Vessel
        left={
          <Contacts />
        }
        right={
          <Chat />
        }
      />
      <MessagebOX />
      <SignUpFor />
    </div>

  </React.StrictMode>,
  document.getElementById('root')
);


