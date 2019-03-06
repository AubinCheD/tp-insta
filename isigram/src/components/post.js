import React from 'react';
import axios from 'axios';
import './post.css';
import {withRouter} from "react-router-dom";

class Post extends React.Component {

    constructor(props) {
        super(props);

        this.state = {userName: '', image: "https://isigram.glitch.me/postImages/" + this.props.image, subtitle: this.props.subtitle};

        this.getData = this.getData.bind(this);

        this.getData();

    }

    async getData(){

        let config = {
            headers: {'Authorization': sessionStorage.getItem("jwtToken")}
        };


        axios.get("https://isigram.glitch.me/user/" + this.props.idUser, config)
        .then( responseUser => {
            if(responseUser.status === 200){
                this.setState({userName: responseUser.data.route.name});
            }
        }).catch(function(error){
            console.log("GET USER\n" + error);
        });
    }

    render() {
        return (
            <div className="postContainer">
                <div className="userLayer">
                    <h3 className="userName">{this.state.userName}</h3>
                </div>
                <div className="imageLayer">
                    <img alt="post" src={this.state.image} />
                </div>
                <div className="subtitleLayer">
                    <p className="subtitle">{this.state.subtitle}</p>
                </div>
            </div>
        );
    }
}

export default withRouter(Post);