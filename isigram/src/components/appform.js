import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import './appform.css';
import '../App.css';
import { withRouter } from 'react-router-dom'



class AppForm extends React.Component {
	
	constructor(props){
		super(props);
		
		this.state = {prenom: '', nom: '', email: '', password: '', homme: true, femme: false, CGU: false, loginEmail: '', loginPassword: ''};
		
		this.handleChangePrenom = this.handleChangePrenom.bind(this);
		this.handleChangeNom = this.handleChangeNom.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleChangeHomme = this.handleChangeHomme.bind(this);
		this.handleChangeFemme = this.handleChangeFemme.bind(this);
		this.handleChangeCGU = this.handleChangeCGU.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeLoginEmail = this.handleChangeLoginEmail.bind(this);
		this.handleChangeLoginPassword = this.handleChangeLoginPassword.bind(this);
		this.handleLogin = this.handleLogin.bind(this);

        if(document.getElementById("quit") !== null) {
            document.getElementById("quit").style.display = "none";
        }
	
	}	
			
	handleSubmit(event) {
		
		event.preventDefault();
		
		//alert(this.state.prenom + ", " + this.state.nom + ", " + this.state.email + ", " + this.state.password + ", " + this.state.homme + ", " + this.state.femme + ", " + this.state.CGU);
		
		/** VALIDITY CHECK **/
		if(this.state.prenom !== "" && this.state.nom !== "" && this.state.email !== "" && this.state.password !== "" && this.state.password.length >= 6 && (this.state.homme || this.state.femme) && this.state.CGU){
		
			axios.post('https://isigram.glitch.me/user', {
				name: this.state.prenom + " " + this.state.nom,
				email: this.state.email,
				password: this.state.password,
				photo: '',
				nbPubli: 0,
				nbAbonnes: 0,
				nbAbonnements: 0
			}).then(function(response) {
				if(response.status === 200){
					console.log("User registered with success");
					axios.post('https://isigram.glitch.me/login', {
						email: this.state.email,
						password: this.state.password,
					}).then(function(response) {
						if(response.status === 200) { //https://medium.com/@rajaraodv/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0
                            console.log("User logged in with success");
                            sessionStorage.setItem("jwtToken", response.data.token);
                            sessionStorage.setItem("email", this.state.email);
                            this.props.history.push("/home");
                        }
					}.bind(this), function(error){
						alert("Cette adresse email est déjà utilisée");
						console.log(error);
					});
				}
			}.bind(this), function(error){
				console.log(error);
			});
			
		}else{
			alert("Non valid form !");
		}

	}

	handleLogin(event){

		console.log("BAUDHUIT");
        event.preventDefault();

        if(this.state.loginEmail !== '' && this.state.loginPassword !== '' && this.state.loginPassword.length >=6){
            axios.post('https://isigram.glitch.me/login', {
                email: this.state.loginEmail,
                password: this.state.loginPassword,
            }).then(function(response) {
                if(response.status === 200){ //https://medium.com/@rajaraodv/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0
                    console.log("User logged in with success");
                    sessionStorage.setItem("jwtToken", response.data.token);
                    sessionStorage.setItem("email", this.state.loginEmail);
                    this.props.history.push("/home");
                }
            }.bind(this), function(error){
                console.log(error);
                alert("login ou mot de passe incorrect");
            });
		}else{
        	alert("non valid form");
		}
	}
	
	handleChangePrenom(event){
		this.setState({prenom: event.target.value});
	}
	
	handleChangeNom(event){
		this.setState({nom: event.target.value});
	}
	
	handleChangeEmail(event){
		this.setState({email: event.target.value});
	}
	
	handleChangePassword(event){
		this.setState({password: event.target.value});
	}
	
	handleChangeHomme(event){
		this.setState({homme: true});
		this.setState({femme: false});
	}
	
	handleChangeFemme(event){
		this.setState({femme: true});
		this.setState({homme: false});
	}
	
	handleChangeCGU(event){
		this.setState({CGU: event.target.value});
	}

	handleChangeLoginEmail(event){
		this.setState({loginEmail: event.target.value});
	}

	handleChangeLoginPassword(event){
		this.setState({loginPassword: event.target.value});
	}
	
  render() {
	  
    return (
    
		  <div id="appform">
			  <h2>Log in</h2>
			<div id="formsContainer">
                <form onSubmit={this.handleLogin} id="loginForm">
                    <FormGroup>
                        <Label for="loginEmail">Email</Label>
                        <Input type="email" name="loginEmail" value={this.state.loginEmail} onChange={this.handleChangeLoginEmail} id="loginEmail" placeholder="Entrez votre adresse email" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="loginPassword">Password</Label>
                        <Input type="password" name="loginPassword" value={this.state.loginPassword} onChange={this.handleChangeLoginPassword} id="password" placeholder="Entrez votre mot de passe" />
                    </FormGroup>

                    <Button>Log in</Button>
                </form>

				<h2>Sign up</h2>
			  <form onSubmit={this.handleSubmit} id="signupForm">
				<FormGroup>
				  <Label for="prenom">Prénom</Label>
				  <Input type="text" value={this.state.prenom} onChange={this.handleChangePrenom} name="prenom" id="prenom" placeholder="Entrez votre prénom" />
				</FormGroup>
				<FormGroup>
				  <Label for="nom">Nom</Label>
				  <Input type="text" name="nom" value={this.state.nom} onChange={this.handleChangeNom} id="nom" placeholder="Entrez votre nom" />
				</FormGroup>
				<FormGroup>
				  <Label for="email">Email</Label>
				  <Input type="email" name="email" value={this.state.email} onChange={this.handleChangeEmail} id="email" placeholder="Entrez votre adresse email" />
				</FormGroup>
				<FormGroup>
				  <Label for="password">Password</Label>
				  <Input type="password" name="password" value={this.state.password} onChange={this.handleChangePassword} id="password" placeholder="Choisissez votre mot de passe" />
				</FormGroup>
				<FormGroup tag="fieldset">
				  <legend>Sexe</legend>
				  <FormGroup check>
					 <input type="radio" name="homme" id="homme"
						   value={this.state.homme}
						   checked={this.state.femme === false}
						   onChange={this.handleChangeHomme} />Homme
					 <input type="radio" name="femme"  id="femme"
						   value={this.state.femme}  
						   checked={this.state.homme === false}
						   onChange={this.handleChangeFemme} />Femme
				  </FormGroup>
				</FormGroup>
				<FormGroup check>
				  <Label check id="cb" >
					<Input type="checkbox" value={this.state.CGU} checked={this.state.CGU} onChange={this.handleChangeCGU} />{' '}
					Accepter les CGU Isigram
				  </Label>
				</FormGroup>
				
				<Button>S'inscrire</Button>
			  </form>
			</div>
		  </div>
    );
  }
}

export default withRouter(AppForm);
