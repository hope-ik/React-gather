import React from 'react';
import ReactDOM from 'react-dom';

function List(props) {
  const numers = [2, 3, 4, 5]
  const double = numers.map((numers) => numers * 2)

  return (
    <div>
      {console.log(double)}
    </div>
  )
}
//1、渲染多个组件
// 你可以通过使用 {} 在 JSX 内构建一个元素集合。
const numers = ["首页", "发现", "精选", "我的"];

const listItems = numers.map((numers) =>
  <li key={numers.toString()}>{numers}</li>
)

//2、基础列表组件
// 通常你需要在一个组件中渲染列表。
// 我们可以把前面的例子重构成一个组件，这个组件接收 numbers 数组作为参数并输出一个元素列表。
function NumberItems(props) {
  const numers = props.numers
  const ListItems = numers.map((numers, index) =>
    //当你创建一个元素时，必须包括一个特殊的 key 属性。
    <li style={{ float: "left", margin: "10px" }} key={index}>{numers}</li>
  )
  return (
    <ul style={{ listStyle: "none" }}>{ListItems}</ul>
  )
}

//3、用 key 提取组件
// 元素的 key 只有放在就近的数组上下文中才有意义。
function ListLi(props) {
  const value = props.value;
  return (
    <li>{value}</li>
  )
}
function ListUl(props) {
  const numers = props.numers;
  const ListLis = data.map((data, index) =>
    <ListLi key={index} value={data} />
  )
  return (
    <ul>{ListLis}</ul>
  )
}
const data = ["首页", "发现", "精选", "评论", "我的"]

//4、在 JSX 中嵌入 map()
function ListLi2(props) {
  return (
    <li>{props.value}</li>
  )
}
function ListUl2(props) {
  const number = props.number
  return (
    <ul>
      {number.map((item, index) =>
        <ListLi2 key={index} value={item} />
      )}
    </ul>
  )
}
const data2 = ["红", "黄", "蓝", "绿", "青"]
//这么做有时可以使你的代码更清晰，但有时这种风格也会被滥用。就像在 JavaScript 中一样，何时需要为了可读性提取出一个变量，这完全取决于你。
//但请记住，如果一个 map() 嵌套了太多层级，那可能就是你提取组件的一个好时机。


ReactDOM.render(
  //<List />,//[4, 6, 8, 10]
  //1、<ul>{listItems}</ul>,
  //2、<NumberItems numers={numers} />,
  //3、<NumberItems numers={numers} />
  //4、<ListUl numers={data} />,
  <ListUl2 number={data2} />,
  document.getElementById('root')
);

