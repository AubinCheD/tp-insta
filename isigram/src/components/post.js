import React from 'react';
import axios from 'axios';
import './post.css';
import {withRouter} from "react-router-dom";
import { Button, FormGroup, Input } from 'reactstrap';

class Post extends React.Component {

    constructor(props) {
        super(props);

        this.state = {userName: '', image: "https://isigram.glitch.me/postImages/" + this.props.image, subtitle: this.props.subtitle, comments: [], currentComment: ''};

        this.getData = this.getData.bind(this);
        this.handleAddComment = this.handleAddComment.bind(this);
        this.handleChangeCurrentComment = this.handleChangeCurrentComment.bind(this);

        this.getData();

    }

    handleAddComment(event) {
        event.preventDefault();

        let config = {
            headers: {'Authorization': sessionStorage.getItem("jwtToken")}
        };

        if (this.state.currentComment.length > 0) {
            axios.post("https://isigram.glitch.me/comment", {
                idPost: this.props.idPost,
                idUser: sessionStorage.getItem("id"),
                text: this.state.currentComment
            }, config)
                .then(response => {
                    if (response.status === 200) {
                        console.log(response);
                        window.location.reload();
                    }
                }).catch(function (error) {
                     console.log(error);
            });
        } else {
            alert("Veuillez écrire un commentaire");
        }
    }


    handleChangeCurrentComment(event){
        this.setState({currentComment: event.target.value});
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

        axios.get("https://isigram.glitch.me/comments?idPost=" + this.props.idPost, config)
        .then( responseComments => {
                if(responseComments.status === 200){
                    console.log("COMMENTS : ");
                    console.log(responseComments.data.route);
                    this.setState({comments: responseComments.data.route});
                }
            }).catch(function(error){
                console.log(error);
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
                <div className="commentsLayer">
                    { this.state.comments.map(comment => <div><h4>{comment.name}</h4><p key={comment}>{comment.text}</p></div>) }
                    <form onSubmit={this.handleAddComment} >
                        <FormGroup>
                            <Input type="text" value={this.state.currentComment} onChange={this.handleChangeCurrentComment} name="currentComment" id="currentComment" placeholder="Enter comment" />
                        </FormGroup>
                        <Button>Comment</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(Post);