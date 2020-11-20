import React from "react";
import Square from "./Square";


class Board extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true,
    //     };
    // }

    // handleClick(i) {
    //     const squares = this.state.squares.slice();
    //     if (calculateWinner(squares) || squares[i]) {
    //         return;
    //     }
    //     squares[i] = this.state.xIsNext ? 'X' : 'O';
    //     this.setState({
    //         squares: squares,
    //         xIsNext: !this.state.xIsNext,
    //     });
    // }

    //井字棋格子
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        // const winner = calculateWinner(this.state.squares);
        // let status;
        // if (winner) {
        //     status = 'Winner: ' + winner;
        // } else {
        //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        // }

        return (
            <div>
                {/* <div className="status">{status}</div> */}
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}



// ========================================
class Game extends React.Component {
    //存储历史记录值的构造函数
    constructor(props) {
        super(props);//使this指向props参数
        this.state = {
            history: [{//把每次下子的数组存储起来
                squares: Array(9).fill(null)//初始化井字棋的数组
            }],
            stepNumber: 0,//创建一个数字控制棋子走的步数
            next: true//创建一个权限判断轮流落子
        }
    };
    //点击格子事件
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);//记录历史走过的棋子
        const current = history[history.length - 1];//保存最新一次历史记录来展示游戏状态
        const squares = current.squares.slice();//浅拷贝数据
        if (calculateWinner(squares) || squares[i]) {//当点击到落了子的格子或者下棋者相同的棋子时点击事件不做事
            return;
        }
        squares[i] = this.state.next ? "X" : "O";//判断当前应当是谁落子
        this.setState({//修改state
            history: history.concat([//当state改变时拼接新的数据
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,//记录下历史下棋步
            next: !this.state.next//反转下棋者
        });
    }

    //跳转回到历史的某一步
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            next: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        //把历史数组映射到一个按钮上
        const moves = history.map((step, move) => {
            //？第几步
            const desc = move ?
                '第' + move + "步" :
                '开始比赛';
            return (
                //循环需要一个键值
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        //当前的游戏状态
        let status;
        if (winner) {
            status = '胜利的是: ' + winner;
        } else {
            status = `现在请${this.state.next ? "X" : "O"}出子`;
        }
        return (
            <div className="Game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <h2>{status}</h2>
                    <ul>{moves}</ul>
                </div>
            </div>
        );
    }
}

// ========================================
//判断胜出者
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}


export default Game;