import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppForm from "./components/appform.js";
import Home from "./Home.js";

const AppRouter = () => (

	<Router>
		<div>
			<Route path="/" exact component={AppForm} />
			<Route path="/home" component={Home} />
		</div>
	</Router>

);

export default AppRouter;
