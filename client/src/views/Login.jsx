import React, { useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { StyledLogin } from './Login.style';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { logIn, googleSignIn, user } = useUserAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate('/home');
		}
	});

	const handleSubmit = async e => {
		e.preventDefault();
		setError('');
		try {
			await logIn(email, password);
			navigate('/home');
		} catch (err) {
			setError(err.message);
		}
	};

	const handleGoogleSignIn = async e => {
		e.preventDefault();
		try {
			await googleSignIn();
			navigate('/home');
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<StyledLogin id="login-page">
			<div className="p-4 box">
				<h2 className="mb-3">Portfolio Manager Login</h2>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Control
							type="email"
							placeholder="Email address"
							onChange={e => setEmail(e.target.value)}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Control
							type="password"
							placeholder="Password"
							onChange={e => setPassword(e.target.value)}
						/>
					</Form.Group>

					<div className="d-grid gap-2">
						<Button variant="primary" type="Submit">
							Log In
						</Button>
					</div>
				</Form>
				<hr />
				<div>
					<GoogleButton
						className="g-btn"
						type="dark"
						onClick={handleGoogleSignIn}
					/>
				</div>
			</div>
			<div className="p-4 box mt-3 text-center">
				Don't have an account? <Link to="/signup">Sign up</Link>
			</div>
		</StyledLogin>
	);
};

export default Login;
