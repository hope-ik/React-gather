import React from 'react';
import ReactDOM from 'react-dom';

//FormattedDate 组件会在其 props 中接收参数 date，但是组件本身无法知道它是来自于 Clock 的 state，或是 Clock 的 props，还是手动输入的：
function FormattedDate(props) {
  return  <div>
            <h1>Holle,State!</h1>
            <h2>It,is{props.date.toLocaleTimeString()}</h2>
          </div>
}
//这通常会被叫做“自上而下”或是“单向”的数据流。任何的 state 总是所属于特定的组件，而且从该 state 派生的任何数据或 UI 只能影响树中“低于”它们的组件。
// 如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源，但是它只能向下流动。


class Clock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
  }
  //为 class 组件声明一些特殊的方法，当组件挂载或卸载时就会去执行这些方法：
  //这些方法叫做“生命周期方法”。

  componentDidMount() {//componentDidMount() 方法 在组件已经被渲染到 DOM 中后运行
    this.timerId = setInterval(
      () => this.tick(),//让tick方法每秒执行一次
      1000)
  }
  componentWillUnmount() {
    clearInterval(this.timerId)//组件从DOM中删除之后销毁定时器
  }

  tick() {
    this.setState({// 使用this.setState来实时更新组件state
      date: new Date()
    })
  }


  render() {
    return (
      <div className="clock">
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}

//每个 Clock 组件都会单独设置它自己的计时器并且更新它。
// 在 React 应用中，组件是有状态组件还是无状态组件属于组件实现的细节，它可能会随着时间的推移而改变。你可以在有状态的组件中使用无状态的组件，反之亦然。
//每个组件都是真正独立的
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  )
}


ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // { </React.StrictMode>, }
  document.getElementById('root')
);





