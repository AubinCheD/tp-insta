import React from 'react';
import '../App.css';
import './myNav.css';
import { withRouter } from 'react-router-dom'



class MyNav extends React.Component {

    constructor(props){
        super(props);

        this.handleQuit = this.handleQuit.bind(this);

    }

    handleQuit(){
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("jwtToken");
        this.props.history.push("/");
    }

    render(){
        return(
            <div id="nav">
                <a href="/"><h1>Isigram</h1></a>
                <a id="quit" href="/" onClick={this.handleQuit}>Déconnexion</a>
            </div>
        );
    }

}

export default withRouter(MyNav);
