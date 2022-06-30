import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import Chat from "./components/Chat.js";
import Login from "./components/Login.js";
import Sidebar from "./components/Sidebar.js";
import { login, logout, selectUser } from "./features/userSlice.js";
import { auth } from "./firebase.js";

function App() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// the user is logged in
				dispatch(
					login({
						uid: authUser.uid,
						photo: authUser.photoURL,
						email: authUser.email,
						displayName: authUser.displayName,
					}),
				);
			} else {
				dispatch(logout());
			}
		});
	}, [dispatch]);

	return (
		<div className="app">
			{user ? (
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
