import React, { Component } from 'react';
import './App.css';

import store from "./store/store";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main/Main";
import { Provider } from "react-redux";


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <div>
              <Main />
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}


export default App;
