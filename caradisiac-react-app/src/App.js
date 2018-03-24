import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  constructor(){
    super();
    this.state ={suv: []};
    this._getSUV = this._getSUV.bind(this)
  }

  _getSUV(){
    fetch('/suv')
    .then(res => {
      console.log(res);
      return res.json()
    })
    .then(suv => {
      console.log(suv);
      this.setState({ suv })
    });
  }

  render() {
    return (
      <div className="App">
      <h1>Highest volume SUV</h1>
      <button onClick={this._getSUV}>Get suv</button>
      {this.state.suv.map(suv =>

        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Brand</th>
              <th>Volume</th>
              <th>Image</th>
            </tr>
          </thead>
          <tr>
            <td>{suv._source.model}</td>
            <td> {suv._source.brand} </td>
            <td>{suv._source.volume} </td>
            <td><img src = {suv._source.image}/> </td>
          </tr>
        </table>
      )}
      </div>
    );
  }
}
export default App;
