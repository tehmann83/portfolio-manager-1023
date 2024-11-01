import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../service/firebase';

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
	const [user, setUser] = useState({});

	function logIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	function signUp(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	function logOut() {
		return signOut(auth);
	}
	function googleSignIn() {
		const googleAuthProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleAuthProvider);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentuser => {
			console.log('Auth', currentuser);
			setUser(currentuser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<userAuthContext.Provider
			value={{ user, logIn, signUp, logOut, googleSignIn }}
		>
			{children}
		</userAuthContext.Provider>
	);
}

export function useUserAuth() {
	return useContext(userAuthContext);
}
