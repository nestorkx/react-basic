import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
      super(props);
      this.state = {qty: 0};
  }
  buy(){
    this.setState({qty: this.state.qty + 1});
    this.props.handleTotal(this.props.price);
  }
  show(){
      this.props.handleShow(this.props.name);
  }
  render(){
    return (
      <div className="App">
          <p>{this.props.name} - ${this.props.price}</p>
          <button onClick={this.buy.bind(this)}>Buy</button>
          <button onClick={this.show.bind(this)}>Show</button>
          <h3>Qty: {this.state.qty} item(s)</h3>
          <hr/>
      </div>
    );
  }
}

class Total extends Component {
    render(){
        return (
            <div>
                <h3>Total Cash: ${this.props.total}</h3>
            </div>
        );
    }
}
class ProductForm extends Component {
    constructor(props){
        super(props);
    }
    submit(e){
        e.preventDefault();
        var product = {
            name: this.name.value,
            price: parseInt(this.price.value)
        };
        this.props.handleCreate(product);
        this.name.value  = "";
        this.price.value = "";
    }
    render(){
        return (
            <form onSubmit={this.submit.bind(this)}>
                <input type="text" placeholder="Product Name"  ref={(name) => { this.name = name; }}/>
                <input type="text" placeholder="Product Price" ref={(price) => { this.price = price; }}/>
                <br/><br/>
                <button>Create Product</button>
                <hr/>
            </form>
        );
    }
}

class ProductList extends Component{
    constructor(props){
        super(props);
        this.state = {
            total       : 0,
            productList : [
                {name: "Android", price:121 },
                {name: "Android", price:123 },
                {name: "Android", price:65  }
            ]
        };
    }
    createProduct(product){
        this.setState({
            productList: this.state.productList.concat(product)
        });
    }
    calculateTotal(price){
        this.setState({total:this.state.total + price});
    }
    showProduct(name){
        alert("Seleccionaste: "+name);
    }
    render(){
        var component = this;
        var products  = this.state.productList.map(function(product){
            return (
                <App name={product.name} price={product.price}
                     handleShow={component.showProduct}
                     handleTotal={component.calculateTotal.bind(component)}/>
            );
        });
        return (
            <div>
                <ProductForm handleCreate={this.createProduct.bind(this)}/>
                {products}
                <Total total={this.state.total} />
            </div>
        );
    }
}

export default ProductList;