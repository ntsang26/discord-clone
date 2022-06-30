import { AddCircle, Send } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader.js";
import Message from "./Message.js";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../features/appSlice.js";
import { selectUser } from "../features/userSlice.js";
import db from "../firebase.js";
import firebase from "firebase/compat/app";

const Chat = () => {
	const user = useSelector(selectUser);
	const channelId = useSelector(selectChannelId);
	const channelName = useSelector(selectChannelName);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (channelId) {
			db.collection("channels")
				.doc(channelId)
				.collection("messages")
				.orderBy("timestamp", "desc")
				.onSnapshot((snapshot) => {
					setMessages(snapshot.docs.map((doc) => doc.data()));
				});
		}
	}, [channelId]);

	const sendMessage = (e) => {
		e.preventDefault();

		if (input) {
			db.collection("channels").doc(channelId).collection("messages").add({
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				message: input,
				user,
			});
		}

		setInput("");
	};

	return (
		<div className="chat">
			<ChatHeader channelName={channelName} />

			<div className="chat__messages">
				{messages.map((mes, idx) => (
					<Message key={idx} message={mes} />
				))}
			</div>

			<div className="chat__input">
				<AddCircle fontSize="large" />
				<form>
					<input
						type="text"
						disabled={!channelId}
						placeholder={`Message #${channelId?.substring(0, 4) || "channel"}`}
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<button
						type="submit"
						className="chat__inputButton"
						onClick={sendMessage}
					>
						Send Message
					</button>
				</form>

				<div className="chat__sendIcon">
					<Send onClick={sendMessage} />
				</div>
			</div>
		</div>
	);
};

export default Chat;
