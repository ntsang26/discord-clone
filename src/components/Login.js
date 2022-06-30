import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "../firebase.js";
import "./Login.css";

const Login = () => {
	const signIn = () => {
		auth.signInWithPopup(provider).catch((err) => console.log(err.message));
	};

	return (
		<div className="login">
			<div className="login__logo">
				<img src={require("../images/logo_login.png")} alt="" />
			</div>

			<Button onClick={signIn}>Sign In</Button>
		</div>
	);
};

export default Login;
