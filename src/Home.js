import React from 'react';
import './Home.css';
import Post from './components/post'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import ImageUploader from 'react-images-upload';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import imageIcon from './img/imageIcon.png';

class Home extends React.Component {


	constructor(props) {
        super(props);

        this.state = {posts: [], picture: [], extension: '', date: 0, legend: '', imageIcon: imageIcon};

        if(sessionStorage.getItem("jwtToken") !== null) {

            this.getData = this.getData.bind(this);
            this.handleChangeLegend = this.handleChangeLegend.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.onDrop = this.onDrop.bind(this);
            this.handleAddFollow = this.handleAddFollow.bind(this);
            this.handleChangeFollow = this.handleChangeFollow.bind(this);

            this.getData();

        }else{
            this.props.history.push("/");
		}

    }

    handleChangeLegend(event){
		this.setState({legend: event.target.value, follow: ''});
	}

	handleAddFollow(event){
		event.preventDefault();

        let config = {headers: {'Authorization': sessionStorage.getItem("jwtToken")}};

		axios.post("https://isigram.glitch.me/follow", {
			idUser: sessionStorage.getItem("id"),
			emailFollowed: this.state.follow
		}, config)
		.then( function(response) {
			if(response.status === 200){
				console.log(response);
                window.location.reload();
			}
		}).catch(function (error) {
            alert("Cet utilisateur n'a pas été trouvé");
			console.log(error);
        });
	}

	handleChangeFollow(event){
		this.setState({follow: event.target.value});
	}

	handleSubmit(event){

        let configFile = {
            headers: {
                'Authorization': sessionStorage.getItem("jwtToken"),
                'content-type': 'multipart/form-data'
            }
        };

        let config = {headers: {'Authorization': sessionStorage.getItem("jwtToken")}};

        event.preventDefault();


		if(this.state.picture.length === 1){
            const formData = new FormData();
            formData.append('photo', this.state.picture[0]);
			axios.post("https://isigram.glitch.me/postImage/" + sessionStorage.getItem("id") + "_" + this.state.date, formData, configFile)
			.then(response => {
				if(response.status === 200){
					console.log(response);
					axios.post("https://isigram.glitch.me/post/", {
						idUser: sessionStorage.getItem("id"),
						photo: sessionStorage.getItem("id") + "_" + this.state.date + "_" + this.state.extension,
						description: this.state.legend,
						nbLikes: 0
					}, config)
					.then(responsePost =>{
						console.log(responsePost);
                        window.location.reload();
					}).catch(function (error) {
						console.log(error);
                    })
				}
			}).catch(function (error) {
				console.log(error);
            })
		}else{
			alert("Please choose a picture");
		}
	}

    async getData(){

        let config = {
            headers: {'Authorization': sessionStorage.getItem("jwtToken")}
        };

		let responseUser = await axios.get("https://isigram.glitch.me/getUserId?email=" + sessionStorage.getItem("email"), config);
		sessionStorage.setItem("id", responseUser.data.route._id);

		axios.get("https://isigram.glitch.me/friendsPosts?idUser=" + sessionStorage.getItem("id"), config)
		.then(responsePosts => {
            console.log(responsePosts.data.route);
            this.setState({posts: responsePosts.data.route})
		}).catch(function(error){
			console.log(error);
		});



	}

    onDrop(picture) {
        this.setState({
            picture: [].concat(picture),
        });
        this.setState({extension: picture[0].name});
        let url = URL.createObjectURL(picture[0]);
        this.setState({imageIcon: url});
        this.setState({date: Date.now()});
    }

	
	render() {
		return (
		  <div id="home">
			  <div id="newPostContainer">
				  <h2>Poster une nouvelle image</h2>
                  <ImageUploader style={{width: "10vw", display: "inline-block"}}
                      withIcon={true}
                      buttonText='Choisir une image'
                      onChange={this.onDrop}
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      maxFileSize={5242880}
					  label="Upload"
                  />
				  <div id="imageFrame">
					  <img src={this.state.imageIcon} alt="preview" id="newPostImage" />
				  </div>
                  <form onSubmit={this.handleSubmit} >
					  <FormGroup>
						  <Label for="legend">Légende</Label>
						  <Input type="textarea" value={this.state.legend} onChange={this.handleChangeLegend} name="legend" id="legend" placeholder="Légende" />
					  </FormGroup>
                      <Button>Poster</Button>
				  </form>
			  </div>

			  <div id="newFollowContainer">
				  <h2>Suivre un isigramer</h2>
				  <form onSubmit={this.handleAddFollow} >
					  <FormGroup>
						  <Label for="follow">Email</Label>
						  <Input type="text" value={this.state.follow} onChange={this.handleChangeFollow} name="follow" id="follow" placeholder="Entrez son adresse email" />
					  </FormGroup>
					  <Button>Suivre</Button>
				  </form>
			  </div>

			  <div id="postsContainer">
				  <h2>Flux</h2>
				  { this.state.posts.map(post => <Post key={post} image={post.photo} idUser={post.idUser} subtitle={post.description} idPost={post._id}></Post>) }
			  </div>

		  </div>
		);
	}
}

export default withRouter(Home);
