import React, { Component } from "react";
import "./App.css";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import "../node_modules/font-awesome/css/font-awesome.min.css";

import "bootstrap";

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
              <div className="err_box err_box_hidden" />
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;
