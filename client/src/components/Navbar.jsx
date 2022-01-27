import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useUserAuth } from '../context/UserAuthContext';

const Navbar = () => {
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
		<div>
			<div className="d-grid gap-2">
				{user && user.displayName ? user.displayName : user.email}
				<Button variant="primary" onClick={handleLogout}>
					Log out
				</Button>
			</div>
		</div>
	);
};

export default Navbar;
