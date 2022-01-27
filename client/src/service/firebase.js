import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signOutUser = () => {
	const auth = getAuth();
	signOut(auth)
		.then(() => {
			console.log('%cUser signed out', 'color:green', auth.currentUser);
		})
		.catch(() => {
			console.log(
				"%cSignout didn't work! The user is still signed in.",
				'color:red'
			);
		});
};
