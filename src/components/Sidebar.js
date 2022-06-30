import React, { useEffect, useState } from "react";
import {
	Call,
	ExpandMore,
	Headset,
	InfoOutlined,
	Mic,
	Settings,
	SignalCellularAlt,
} from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import "./Sidebar.css";
import SidebarChannel from "./SidebarChannel.js";
import { Avatar, Fade, Popper } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice.js";
import db, { auth } from "../firebase.js";

const Sidebar = () => {
	const user = useSelector(selectUser);

	const [anchorEl, setAnchorEl] = useState(null);
	const [channels, setChannels] = useState([]);

	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};
	const open = Boolean(anchorEl);
	const id = open ? "transitions-popper" : undefined;

	useEffect(() => {
		db.collection("channels").onSnapshot((snapchot) => {
			setChannels(
				snapchot.docs.map((doc) => ({
					id: doc.id,
					channel: doc.data(),
				})),
			);
		});
	}, []);

	const handleAddChannel = () => {
		const channelName = prompt("Enter a new channel name:");

		if (channelName) {
			db.collection("channels").add({
				channelName: channelName,
			});
		}
	};

	return (
		<div className="sidebar">
			<div className="sidebar__top">
				<h3>BOG Discord</h3>
				<ExpandMore />
			</div>
			<div className="sidebar__channels">
				<div className="sidebar__channelsHeader">
					<div className="sidebar__header">
						<ExpandMore />
						<h4>Channels</h4>
					</div>
					<AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
				</div>
				<div className="sidebar__channelsList">
					{channels.map((channel, idx) => (
						<SidebarChannel
							key={idx}
							id={channel.id}
							channelName={channel.channel.channelName}
						/>
					))}
				</div>
			</div>

			<div className="sidebar__voice">
				<SignalCellularAlt className="sidebar__voiceIcon" fontSize="large" />
				<div className="sidebar__voiceInfo">
					<h3>Voice Connected</h3>
					<p>Stream</p>
				</div>

				<div className="sidebar__voiceIcons">
					<InfoOutlined />
					<Call />
				</div>
			</div>

			<div className="sidebar__profile">
				<Avatar aria-describedby={id} onClick={handleClick} src={user.photo} />
				<Popper
					id={id}
					open={open}
					anchorEl={anchorEl}
					placement="top"
					transition
				>
					{({ TransitionProps }) => (
						<Fade {...TransitionProps} timeout={350}>
							<div className="sidebar__logout">
								<span onClick={() => auth.signOut()}>Logout</span>
							</div>
						</Fade>
					)}
				</Popper>
				<div className="sidebar__profileInfo">
					<h3>{user.displayName}</h3>
					<p>#{user.uid.substring(0, 4)}</p>
				</div>
				<div className="sidebar__profileIcons">
					<Mic />
					<Headset />
					<Settings />
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
