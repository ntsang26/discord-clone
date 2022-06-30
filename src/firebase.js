import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyDpLEqTdNxNFKXXXFPLQqfIfxmLU9P70Hc",
	authDomain: "discord-clone-b940c.firebaseapp.com",
	projectId: "discord-clone-b940c",
	storageBucket: "discord-clone-b940c.appspot.com",
	messagingSenderId: "369597016110",
	appId: "1:369597016110:web:4798ca58edb1ddd5ffd7bf",
	measurementId: "G-HWYV1YJ4N5",
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export default db;
