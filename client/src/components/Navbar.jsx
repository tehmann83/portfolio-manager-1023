import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useStockSymbols } from '../context/StockSymbolsContext';
import { useUserAuth } from '../context/UserAuthContext';
import { StyledNavbar } from './Navbar.style';
import Searchbar from './Searchbar';

const Navbar = () => {
	const { logOut, user } = useUserAuth();
	const { symbols } = useStockSymbols();
	const navigate = useNavigate();
	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		console.log('symbols from useStockSymbols\n', symbols);
	}, []);

	const onSearchSubmit = term => {
		let matches = [];

		if (term.length) {
			matches = symbols.filter(symbol => {
				const regex = new RegExp(`${term}`, 'gi');
				return symbol['Ticker'].match(regex) || symbol['Company'].match(regex);
			});
			setSuggestions(matches);
		}
	};

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
			<Searchbar onSearchSubmit={term => onSearchSubmit(term)} />
			{suggestions ? <div>{JSON.stringify(suggestions)}</div> : <div>nix</div>}
			<div id="user-menu" className="d-grid gap-2">
				<div id="logout" onClick={handleLogout}>
					Log out
				</div>
			</div>
		</StyledNavbar>
	);
};

export default Navbar;
