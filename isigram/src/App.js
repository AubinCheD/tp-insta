import React, { Component } from 'react';
import AppForm from './components/appform.js';
import Slideshow from './components/slideshow.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div id="app">
		<Slideshow />
		<h1>Isigram</h1>
		
		<div id="formContainer">
			<AppForm />
		</div>
      </div>
    );
  }
}

export default App;
