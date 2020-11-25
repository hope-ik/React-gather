import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import "./index.css"


//FilterableProductTable : 是整个示例应用的整体
//SearchBar : 接受所有的用户输入
//ProductTable : 展示数据内容并根据用户输入筛选结果
//ProductCategoryRow : 为每一个产品类别展示标题
//ProductRow : 每一行展示一个产品

//确定 UI state 的最小（且完整）表示
//包含所有产品的原始列表是经由 props 传入的，所以它不是 state；搜索词和复选框的值应该是 state，因为它们随时间会发生改变且无法由其他数据计算而来；经过搜索筛选的产品列表不是 state，因为它的结果可以由产品的原始列表根据搜索词和复选框的选择计算出来。
// 综上所述，属于 state 的有：
//1、用户输入的搜索词
//2、复选框是否选中的值

//添加反向数据流
//每当用户改变表单的值，我们需要改变 state 来反映用户的当前输入。由于 state 只能由拥有它们的组件进行更改，FilterableProductTable 必须将一个能够触发 state 改变的回调函数（callback）传递给 SearchBar。
// 我们可以使用输入框的 onChange 事件来监视用户输入的变化，并通知 FilterableProductTable 传递给 SearchBar 的回调函数。然后该回调函数将调用 setState()，从而更新应用。

class ProductCategoryRow extends React.Component {//标题
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">{category}</th>
      </tr>
    )
  }
}
class ProductRow extends React.Component {//产品
  render() {
    const products = this.props.products;
    const name = products.stocked ? products.name :
      <span style={{ color: "red" }}>
        {products.name}
      </span>

    return (
      <tr>
        <td>{name}</td>
        <td>{products.price}</td>
      </tr>
    )
  }
}

class FragmentTitle extends React.Component {//React Fragments 组合 <> </>Fragments短语法
  render() {
    return (
      <Fragment> 
        <th>Name</th>
        <th>Price</th>
      </Fragment>
    )
  }
}

class ProductTable extends React.Component {//数据内容
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;

    const rows = [];
    let latestCategory = null;
    this.props.products.forEach(products => {
      if (products.name.indexOf(filterText) === -1) {//判断写入的filterText中第一个字符串是否符合数组中name的第一个字符串值 不等于的话直接返回空
        return;
      }
      if (inStockOnly && !products.stocked) {
        return;
      }
      if (products.category !== latestCategory) {
        rows.push(
          <ProductCategoryRow
            category={products.category}
            key={products.category}
          />
        )
      }
      rows.push(
        <ProductRow
          products={products}
          key={products.name}
        />
      )
      latestCategory = products.category
    });
    return (
      <table>
        <thead>
          <tr>
            <FragmentTitle />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}


class SearchBar extends React.Component {//搜素框

  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this)
  }

  handleFilterTextChange(e) {
    this.props.onFilterText(e.target.value)
  }
  handleInStockChange(e) {
    this.props.onInStock(e.target.checked)
  }
  render() {

    return (
      <form>
        <input
          placeholder="Search..."
          type="tetx"
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.handleInStockChange}
          />
          {''}
            Only show products in stock
        </p>
      </form>
    )
  }
}

class FilterableProductTable extends React.Component {//完整产品容器
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    }
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this)
  }
  handleFilterTextChange(text) {
    this.setState({
      filterText: text
    })
    // console.log(text)
  }
  handleInStockChange(stock) {
    this.setState({
      inStockOnly: stock
    })
    // console.log(stock)
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilterText={this.handleFilterTextChange}
          onInStock={this.handleInStockChange}
        />
        <ProductTable
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          products={this.props.products}
        />
      </div>


    )
  }
}


const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
];

ReactDOM.render(
  <React.StrictMode>
    <FilterableProductTable
      products={PRODUCTS}
    />
    {/* <ProductTable products={PRODUCTS}/> */}
  </React.StrictMode>,
  document.getElementById('container')
);

