import React, { useEffect, useState } from 'react';
import { StyledSearchbar } from './Searchbar.style';

const Searchbar = ({ onSearchSubmit }) => {
	const [term, setTerm] = useState('');

	useEffect(() => {
		if (term !== '') {
			onSearchSubmit(term);
		}
	}, [term]);

	return (
		<StyledSearchbar>
			<div className="searchbar">
				<input
					className="searchbar-input"
					type="text"
					placeholder="Search ticker symbol"
					onChange={e => setTerm(e.target.value)}
				/>
			</div>
		</StyledSearchbar>
	);
};

export default Searchbar;
