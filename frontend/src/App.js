import React, { Component } from 'react';
import './App.css';
import 'bootstrap';

import store from "./store/store";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main/Main";
import { Provider } from "react-redux";



import StateLoader from "./store/store-actions";

const stateLoader = new StateLoader();

store.subscribe(() => {
    stateLoader.saveState(store.getState());
});


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <div>
              <Main />
              <div className="err_box err_box_hidden"></div>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}


export default App;
