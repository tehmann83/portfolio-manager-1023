import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBQhK10BCtVATKnR1xRG32z3USzDWUAddA',
	authDomain: 'portfolio-manager-1023.firebaseapp.com',
	projectId: 'portfolio-manager-1023',
	storageBucket: 'portfolio-manager-1023.appspot.com',
	messagingSenderId: '831139081093',
	appId: '1:831139081093:web:22df9805adf4899cd0f2ec'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);

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
