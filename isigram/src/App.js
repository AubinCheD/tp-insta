/*https://hackernoon.com/full-stack-web-application-using-react-node-js-express-and-webpack-97dbd5b9d708*/

import React, { Component } from 'react';
import AppForm from './components/appform.js';
import Slideshow from './components/slideshow.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div id="app">
		<Slideshow className="slideshow"/>
		<h1>Isigram</h1>
		
		<div id="formContainer">
			<AppForm />
		</div>
      </div>
    );
  }
}

export default App;
