import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import GoogleButton from 'react-google-button';
import './App.css';
import { authentication, signOutUser } from './service/firebase';

function App() {
	const [data, setData] = useState(null);
	const [isUserSignedIn, setIsUserSignedIn] = useState(false);
	const [user, setUser] = useState(null);

	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();

		signInWithPopup(authentication, provider)
			.then(res => {
				console.log('%cResponse from signInWithGoolge', 'color:green', res);
				setIsUserSignedIn(true);
				setUser(res);
			})
			.catch(err => {
				console.log('TFB_ERROR @signInWithGoogle: ', err);
			});
	};

	const googleSignOut = () => {
		signOutUser();
		setIsUserSignedIn(false);
	};

	useEffect(() => {
		fetch('/api')
			.then(res => res.json())
			.then(data => setData(data.message));
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<p>Landing page</p>
				{!isUserSignedIn ? (
					<GoogleButton onClick={signInWithGoogle}>Sign In</GoogleButton>
				) : (
					<>
						<button onClick={googleSignOut}>Sign Out</button>
					</>
				)}
				<p>{!data ? 'Loading...' : data}</p>
			</header>
		</div>
	);
}

export default App;
