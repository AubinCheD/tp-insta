import React from 'react';
import './Home.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
	
	constructor(props){
		super(props);
		
		
		this.createPost = this.createPost.bind(this);
		
		var config = {
			headers: {'Authorization': sessionStorage.getItem("jwtToken")}
		};	
		
		axios.get("https://isigram.glitch.me/users", config)
		.then(response => {
			if(response.status === 200){
				console.log(response);
			}
		}).catch(function (error){
			console.log(error);
		});

	}	

	createPost(){
		console.log("Post creation");
	}
	
	render() {
		return (
		  <div>
			<button onClick={this.createPost}>Create post</button>
		  </div>
		);
	}
}

export default withRouter(Home);
