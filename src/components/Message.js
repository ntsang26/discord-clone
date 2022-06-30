import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";

const Message = ({ message }) => {
	const convertTimeStamp = (timestamp) => {
		let convertedTimestamp = new Date(timestamp?.toDate()).toUTCString();
		return convertedTimestamp;
	};

	return (
		<div className="message">
			<Avatar src={message.user.photo} />
			<div className="message__info">
				<h4>
					{message.user.displayName}
					<span className="message__timestamp">
						{convertTimeStamp(message.timestamp)}
					</span>
				</h4>
				<p>{message.message}</p>
			</div>
		</div>
	);
};

export default Message;
