import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import './App.css';
import { authentication, signOutUser } from './service/firebase';
import Home from './views/Home';

export const UserContext = createContext(null);

function App() {
	/* const [data, setData] = useState(null); */
	const [isUserSignedIn, setIsUserSignedIn] = useState(
		false || window.localStorage.getItem('auth') === 'true'
	);
	const [user, setUser] = useState(null);
	const [userName, setUserName] = useState(null);
	const [token, setToken] = useState('');

	useEffect(() => {
		/* fetch('/api')
			.then(res => res.json())
			.then(data => setData(data.message)); */

		authentication.onAuthStateChanged(user => {
			console.log('user from onAuthStateChanged', user);
			if (user) {
				setIsUserSignedIn(true);
				setUser(user);
				setUserName(user.displayName);
				window.localStorage.setItem('auth', 'true');
				user.getIdToken().then(token => {
					setToken(token);
				});
			}
		});
	}, []);

	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();

		signInWithPopup(authentication, provider)
			.then(res => {
				if (res) {
					setIsUserSignedIn(true);
					setUser(res);
					setUserName(res.user.displayName);
					window.localStorage.setItem('auth', 'true');
				}
			})
			.catch(err => {
				console.log('TFB_ERROR @signInWithGoogle: ', err);
			});
	};

	const googleSignOut = () => {
		signOutUser();
		setIsUserSignedIn(false);
		window.localStorage.setItem('auth', 'false');
	};

	return (
		<div className="App">
			{!isUserSignedIn ? (
				<>
					<p>Landing page</p>
					<GoogleButton onClick={signInWithGoogle}>Sign In</GoogleButton>
				</>
			) : (
				<>
					<UserContext.Provider value={userName}>
						<button onClick={googleSignOut}>Sign Out</button>
						<Home token={token} />
						<User />
					</UserContext.Provider>
				</>
			)}
			{/* <p>{!data ? 'Loading...' : data}</p> */}
		</div>
	);
}

function User() {
	return (
		<UserContext.Consumer>{value => <h3>{value}</h3>}</UserContext.Consumer>
	);
}

export default App;
