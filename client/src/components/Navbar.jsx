import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useStockSymbols } from '../context/StockSymbolsContext';
import { useUserAuth } from '../context/UserAuthContext';
import { StyledNavbar } from './Navbar.style';
import Searchbar from './Searchbar';

const Navbar = () => {
	const { logOut } = useUserAuth();
	const { symbols } = useStockSymbols();
	const navigate = useNavigate();
	const [suggestions, setSuggestions] = useState([]);

	const onSearchSubmit = term => {
		let matches = [];

		if (term.length > 1) {
			matches = symbols.filter(symbol => {
				const regex = new RegExp(`${term}`, 'gi');
				return symbol['Ticker'].match(regex) || symbol['Company'].match(regex);
			});

			for (let item of matches) {
				item.value = item.Ticker;
				item.label = `${item.Ticker} - ${item.Company}`;
			}
			setSuggestions(matches);
		} else {
			setSuggestions([]);
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
			<Searchbar
				onSearchSubmit={term => onSearchSubmit(term)}
				suggestions={suggestions}
				options={symbols}
			/>
			<div id="user-menu" className="d-grid gap-2">
				<div id="logout" onClick={handleLogout}>
					Log out
				</div>
			</div>
		</StyledNavbar>
	);
};

export default Navbar;
