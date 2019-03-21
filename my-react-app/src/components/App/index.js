import React, { Component } from 'react';
import logo from '../../assets/image/logo.svg';
import './App.css';

class Index extends Component {
  // componentDidMount() {
  //   axios({
  //     url: "/api/dataServicePlatform/data/platform?method=select&serviceId=xhly_ChaSight&backtype=json",
  //     method: "get"
  //   }).then(res => {
  //     console.log(res);
  //   })
  // }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React!!!
          </a>
        </header>
      </div>
    );
  }
}

export default Index;
