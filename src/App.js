import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Chat from "./components/Chat.js";
import Login from "./components/Login.js";
import Sidebar from "./components/Sidebar.js";
import { login, logout, selectUser } from "./features/userSlice.js";
import { auth } from "./firebase.js";
import ReactLoading from "react-loading";

function App() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch(
					login({
						uid: authUser.uid,
						photo: authUser.photoURL,
						email: authUser.email,
						displayName: authUser.displayName,
					}),
				);
				setLoading(false);
			} else {
				dispatch(logout());
				setLoading(false);
			}
		});
	}, [dispatch]);

	return (
		<div className="app">
			{loading ? (
				<div className="loading">
					<ReactLoading type="spinningBubbles" color="#738adb" />
				</div>
			) : user ? (
				<>
					<Sidebar />
					<Chat />
				</>
			) : (
				<Login />
			)}
		</div>
	);
}

export default App;
