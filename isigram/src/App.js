/*https://hackernoon.com/full-stack-web-application-using-react-node-js-express-and-webpack-97dbd5b9d708*/

import React, { Component } from 'react';
import AppRouter from './AppRouter.js';
import MyNav from './components/myNav';
import { BrowserRouter as Router } from "react-router-dom";


class App extends Component {
  render() {
    return (
        <Router>
            <div>
                <MyNav></MyNav>
                <AppRouter></AppRouter>
            </div>
        </Router>
    );
  }
}

export default App;
