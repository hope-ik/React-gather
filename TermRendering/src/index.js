import React from "react";
import ReactDOM from "react-dom";

// function UserGreeting(props) {
//   return (
//     <div>
//       <h2>欢迎归来！</h2>;
//     </div>
//   );
// }
// function GuestGreeting(prpos) {
//   return <h2>请登录.</h2>;
// }

// function Greeting(props) {
//   const upload = props.upload;
//   if (upload) {
//     return <UserGreeting />;
//   }
//   return <GuestGreeting />;
// }

// function LoginButton(props) {
//   return <button onClick={props.onClick}>Login</button>;
// }
// function LogoutButton(props) {
//   return <button onClick={props.onClick}>Logout</button>;
// }

// class LoginControl extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleLoginClick = this.handleLoginClick.bind(this);
//     this.handleLogoutClick = this.handleLogoutClick.bind(this);
//     this.state = {
//       isLoggedIn: false,
//     };
//   }
//   handleLoginClick() {
//     this.setState({ isLoggedIn: true });
//   }
//   handleLogoutClick() {
//     this.setState({ isLoggedIn: false });
//   }

//   render() {
//     const isLoggedIn = this.state.isLoggedIn;
//     let button;
//     if (isLoggedIn) {
//       button = <LogoutButton onClick={this.handleLogoutClick} />;
//     } else {
//       button = <LoginButton onClick={this.handleLoginClick} />;
//     }
//     return (
//       <div>
//         <Greeting upload={isLoggedIn} />
//         {button}
//       </div>
//     );
//   }
// }

//2、与运算符 &&
// function Mailbox(props) {
//   const unreadMessages = props.unreadMessages;
//   return (
//     <div>
//       <h1>Hello,Re</h1>
//       {unreadMessages.length > 0 && (
//         <h2>您现在还有{unreadMessages.length}条未读信息</h2>
//       )}
//     </div>
//   );
// }

//3、三目运算符
class IsLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: true,
      user: function user(params) {
        return <span>已</span>;
      },
      unUser: function unUser(params) {
        return <span>未</span>;
      },
    };
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const User = this.state.user;
    const unUser = this.state.unUser;
    return (
      <div>
        <h2>用户{isLoggedIn ? <User /> : <unUser />}登录</h2>
      </div>
    );
  }
}
//4、阻止组件渲染
function Warning(props) {
  const v = (document.getElementById("root").innerHTML = window.location);
  if (!props.warn) {
    return null;
  }
  return <div>{(alert("警告！"), console.log(v))}</div>;
}
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      warnShow: true,
    };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
  handleToggleClick() {
    this.setState((state) => ({
      warnShow: !this.state.warnShow,
    }));
  }
  render() {
    return (
      <div>
        <Warning warn={this.state.warnShow} />
        <button onClick={this.handleToggleClick}>
          {this.state.warnShow ? "消失" : "显示"}
        </button>
      </div>
    );
  }
}

//2、 const messages = ["React", "Re:React", "Re:Re:React"];
ReactDOM.render(
  // {/* <LoginControl /> */ },
  //2、<Mailbox unreadMessages={messages} />,
  //3、<IsLogin />,
  <Page />,
  document.getElementById("root")
);
