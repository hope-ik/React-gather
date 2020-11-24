import React from 'react';
import ReactDOM from 'react-dom';
//通常，多个组件需要反映相同的变化数据，这时我们建议将共享状态提升到最近的共同父组件中去。让我们看看它是如何运作的。
// 我们将创建一个用于计算水在给定温度下是否会沸腾的温度计算器。

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <h2>水已经沸腾啦！</h2>
  }
  return <h2>水还未沸腾</h2>
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      temperature: event.target.value
    })
  }
  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>请在文本框中输入温度:</legend>
        <input
          value={temperature}
          onChange={this.handleChange}
        />
        <BoilingVerdict celsius={parseFloat(temperature)} />
      </fieldset>

    )
  }
}
//添加第二个输入框
// 我们的新需求是，在已有摄氏温度输入框的基础上，我们提供华氏度的输入框，并保持两个输入框的数据同步
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      temperature: event.target.value
    })
    // console.log(scaleNames)
    // console.log(this.state.temperature)
  }
  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>请输入温度{scaleNames[scale]}</legend>
        <input
          value={temperature}
          onChange={this.handleChange}
        />
      </fieldset>
    )
  }
}
//我们现在有了两个输入框，但当你在其中一个输入温度时，另一个并不会更新。这与我们的要求相矛盾：我们希望让它们保持同步。

//编写转换函数
function toCelsius(fahrenheit) {//求摄氏度公式是: C=(F-32)*1.8
  return (fahrenheit - 32) * 5 / 9
}
function toFahrenheit(celsius) {//求华氏度公式是: F=C*9/5+32
  return (celsius * 9 / 5) + 32
}

//上述两个函数仅做数值转换。而我们将编写另一个函数，它接受字符串类型的 temperature 和转换函数作为参数并返回一个字符串。我们将使用它来依据一个输入框的值计算出另一个输入框的值。
// 当输入 temperature 的值无效时，函数返回空字符串，反之，则返回保留三位小数并四舍五入后的转换结果：
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature)
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000
  return rounded;
}
// tryConvert("10.22",toFahrenheit)//50.396

//状态提升
// 在 React 中，将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state。这就是所谓的“状态提升”。
const scaleNames2 = {
  c: 'Celsius',
  f: 'Fahrenheit'
}
class TemperatureInput2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.change(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>请输入温度: {scaleNames2[scale]}:</legend>
        <input value={temperature}
          onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = { temperature: '', scale: 'c' };
  }

  handleCelsiusChange(temperature) {
    this.setState({ scale: 'c', temperature });
  }

  handleFahrenheitChange(temperature) {
    this.setState({ scale: 'f', temperature });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput2
          scale="c"
          temperature={celsius}
          value={this.handleCelsiusChange} />
        <TemperatureInput2
          scale="f"
          temperature={fahrenheit}
          change={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}




ReactDOM.render(
  <React.StrictMode>
    <div>
      <Calculator />
      <h2>两个输入框:</h2>
      <TemperatureInput scale={"c"} />
      <TemperatureInput scale={"f"} />
      <hr />
      <div>
        <h2>状态提升：</h2>
        <Calculator2 />
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
