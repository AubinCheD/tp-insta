import React from 'react';
import '../App.css';
import './myFooter.css';
import { withRouter } from 'react-router-dom'



class MyNav extends React.Component {

    render(){
        return(
            <div id="footer">
                <p>©Isigram 2019, all rights reserved. Made with ReactJS and a lot of coffee.</p>
            </div>
        );
    }

}

export default withRouter(MyNav);
