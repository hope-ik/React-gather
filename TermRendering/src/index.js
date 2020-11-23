import React from 'react';
import ReactDOM from 'react-dom';

//1、条件渲染
function UserGreeting(props) {
  return <h2>欢迎归来！</h2>
}
function GuestGreeting(prpos) {
  return <h2>请登录.</h2>
}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return (
      <UserGreeting />
    )
  }
  return (
    <GuestGreeting />
  )
}
//2、元素变量
// 你可以使用变量来储存元素。 它可以帮助你有条件地渲染组件的一部分，而其他的渲染部分并不会因此而改变。
function LoginButton(porps) {
  return (
    <button onClick={porps.onClick}>登录</button>
  )
}
function LogoutButton(porps) {
  return (
    <button onClick={porps.onClick}>注销</button>
  )
}

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }
  handleLoginClick() {
    this.setState({
      isLoggedIn: true
    })
  }
  handleLogoutClick() {
    this.setState({
      isLoggedIn: false
    })
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />
    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    )
  }

}

//3、与运算符 &&
//如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。
function Mailbox(props) {
  const unreadMessage = props.unreadMessage;
  return (
    <div>
      {unreadMessage.length > 0 &&
        <h2>你还有{unreadMessage.length}条未读信息</h2>
      }
    </div>
  )
}
const message = ["React", "Re:React", "Re:Re:React"]

//4、三目运算符
class Operation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    }
    this.ChangeTrue = this.ChangeTrue.bind(this)
    this.Changefalse = this.Changefalse.bind(this)

  }
  ChangeTrue() {
    this.setState({
      isLogin: true
    })
  }
  Changefalse() {
    this.setState({
      isLogin: false
    })
  }
  render() {
    const isLogin = this.state.isLogin;
    return (
      <div>
        <b>您{isLogin ? "已" : "未"}登录</b>
        {isLogin ? <button onClick={this.Changefalse}>退出</button> : <button onClick={this.ChangeTrue}>登录</button>}
      </div>
    )
  }
}

//5、阻止组件渲染
// 在极少数情况下，你可能希望能隐藏组件，即使它已经被其他组件渲染。若要完成此操作，你可以让 render 方法直接返回 null，而不进行任何渲染。
let n=document.getElementById("root").innerHTML=navigator.appCodeName;
// n=JSON.stringify(n)
function Warning(props) {
  if (!props.warn) {
    return (
      <div>
        {document.write(n)}
      </div>
    )
  }
  return (
    <div>
      {alert("true")}
    </div>
  )
}
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      WarningShow: true
    }
    this.ChangeShow = this.ChangeShow.bind(this)
  }
  ChangeShow() {
    this.setState(state => ({
      WarningShow: !this.state.WarningShow
    }))
  }

  render() {
    return (
      <div>
        <Warning warn={this.state.WarningShow} />
        <button onClick={this.ChangeShow}>{this.state.WarningShow ? "Hide" : "Show"}</button>
      </div>

    )
  }
}



ReactDOM.render(
  //1、<Greeting  isLogin={false}/>,
  //2、<LoginControl />,
  //3、<Mailbox unreadMessage={message} />,
  //4、 <Operation />,
  <Page/>,
  document.getElementById('root')
);

