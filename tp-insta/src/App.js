import React, { Component } from 'react';
import FirstComponent from './components/FirstComponent.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
    <div>
		<FirstComponent title="Hello World" />
		<FirstComponent title="Hello World (2)" />
	</div>);
  }
}

export default App;
