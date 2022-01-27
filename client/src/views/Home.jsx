import React from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import { useUserAuth } from '../context/UserAuthContext';

const Home = () => {
	const { logOut, user } = useUserAuth();
	const navigate = useNavigate();
	const handleLogout = async () => {
		try {
			await logOut();
			navigate('/');
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<Container>
			<Navbar />
			<div className="p-4 box mt-3 text-center">
				Hello Welcome <br />
				{user && user.displayName ? user.displayName : user.email}
			</div>
		</Container>
	);
};

export default Home;
