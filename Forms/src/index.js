import React from 'react';
import ReactDOM from 'react-dom';

//1、受控组件
//在 HTML 中，表单元素（如<input>、 <textarea> 和 <select>）之类的表单元素通常自己维护 state，并根据用户输入进行更新。
// 而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新。
// 我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。
class ValueForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
  }
  handleChange(even) {
    this.setState({
      value: even.target.value
    })
    // console.log(even.target.value)
  }
  formSubmit(event) {
    alert("输入的值是：" + this.state.value);
    event.preventDefault();//取消事件的默认动作
  }

  render() {
    return (
      <form onSubmit={this.formSubmit}>
        <label>
          请输入：
          <input type="text" value={this.state.value} onChange={this.handleChange}></input>
        </label>
        <input type="submit" value="提交" />
      </form>
    )
  }
}

//2、textarea标签
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "请撰写一篇关于DOM元素的文章"
    }
    this.handleChange = this.handleChange.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }
  formSubmit(event) {
    alert("提交的文章内容是:" + this.state.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.formSubmit}>
        <label onSubmit={this.formSubmit}>
          <textarea value={this.state.value} onChange={this.handleChange}></textarea>
        </label>
        <input type="submit" value="提交" />
      </form>
    )
  }
}

//3、select标签
//请注意，由于 selected 属性的缘故，椰子选项默认被选中。React 并不会使用 selected 属性，而是在根 select 标签上使用 value 属性。这在受控组件中更便捷，因为您只需要在根标签中更新它
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "mango"
    }
    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }
  formSubmit(event) {
    alert("您喜欢的水果是:" + this.state.value)
  }
  render() {
    return (
      <form onSubmit={this.formSubmit}>
        <label>
          选择你喜欢的水果：
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="apple">苹果</option>
            <option value="melon">西瓜</option>
            <option value="mango">芒果</option>
            <option value="banana">香蕉</option>
          </select>

        </label>
        <input value="提交" type="submit" />
        <input type="file" />
      </form>
    )
  }
}
//在 HTML 中，<input type="file"> 允许用户从存储设备中选择一个或多个文件，将其上传到服务器，或通过使用 JavaScript 的 File API 进行控制。
//因为它是只读的，所以是React中的一个非受控组件


//4、处理多个输入
//当需要处理多个 input 元素时，我们可以给每个元素添加 name 属性，并让处理函数根据 event.target.name 的值选择要执行的操作
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target
    const value = target.name === 'isGoing' ? target.checked : target.value
    const name = target.name
    if (this.state.isGoing === true) {
      this.setState({
        numberOfGuests: this.state.numberOfGuests + 1
      })

    }
    this.setState({
      [name]: value,
      isGoing: !this.state.isGoing
    })

  }

  render() {
    return (
      <form>
        <label>
          参与:
          <input
            name="isGoing"
            type="checkbox"
            checked={!this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          出席人数:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    )
  }
}



ReactDOM.render(
  <div>
    <ValueForm />
    <EssayForm />
    <FlavorForm />
    <Reservation />
  </div>,
  document.getElementById('root')
);


