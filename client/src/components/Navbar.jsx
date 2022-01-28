import React from 'react';
import { useNavigate } from 'react-router';
import { useUserAuth } from '../context/UserAuthContext';
import { StyledNavbar } from './Navbar.style';

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
		<StyledNavbar id="navbar" className="p-4 fixed-top">
			<div>logo here</div>
			<div>searchbar here</div>
			<div id="user-menu" className="d-grid gap-2">
				<div id="logout" onClick={handleLogout}>
					Log out
				</div>
			</div>
		</StyledNavbar>
	);
};

export default Navbar;
