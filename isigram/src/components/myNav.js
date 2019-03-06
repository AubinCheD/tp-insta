import React from 'react';
import '../App.css';
import './myNav.css';
import { withRouter } from 'react-router-dom'



class MyNav extends React.Component {

    render(){
        return(
            <div id="nav">
                <h1>Isigram</h1>
            </div>
        );
    }

}

export default withRouter(MyNav);
