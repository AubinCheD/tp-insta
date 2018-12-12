import React, { Component } from 'react';
import singe from '../img/singe.jpeg';
import singe2 from '../img/singe2.jpeg';

class FirstComponent extends Component {
  
  constructor(props){
	  super(props);
	  this.state = { img: singe }
	  this.mouseOver = this.mouseOver.bind(this);
	  this.mouseOut = this.mouseOut.bind(this);
  }
	
  render() {
	const {title} = this.props;
    return (
      <div>
			<h1>{title}</h1>
			<p>Lorem Baudhuipsum</p>
			<img src={this.state.img} onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} alt="image" />
      </div>
    );
  }
  
  mouseOver(){
	  this.setState({ img: singe2});
  }
  
  mouseOut(){
	  this.setState({ img: singe});
  }
}

export default FirstComponent;
