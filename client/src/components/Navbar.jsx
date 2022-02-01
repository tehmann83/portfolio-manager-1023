import React from 'react';
import { useNavigate } from 'react-router';
import { useStockSymbols } from '../context/StockSymbolsContext';
import { useUserAuth } from '../context/UserAuthContext';
import { StyledNavbar } from './Navbar.style';
import Searchbar from './Searchbar';

const Navbar = () => {
	const { logOut } = useUserAuth();
	const { symbols } = useStockSymbols();
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
		<StyledNavbar id="navbar" className="p-4">
			<div>logo here</div>
			<Searchbar options={symbols} />
			<div id="user-menu" className="d-grid gap-2">
				<div id="logout" onClick={handleLogout}>
					Log out
				</div>
			</div>
		</StyledNavbar>
	);
};

export default Navbar;
