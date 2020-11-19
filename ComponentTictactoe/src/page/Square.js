import React from "react";
// import Board from "./Board"

//函数组件和class组件的区别
// 用构造函数创建出来的组件，叫做“无状态组件”；
// 用class关键字创建出来的组件，叫做“有状态组件”；
// 有状态组件和无状态组件之间的本质区别是有无state属性。
// class Square extends React.Component {
// constructor(props) {
//     super(props);
//     this.state = {
//         value: null,
//     };
// }

const Square = (props) => {
    return (
        <button
            className="square"
            onClick={() => props.onClick()}
        >
            {props.value}
        </button>
    );
}

// }
export default Square