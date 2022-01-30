import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import MenuList from './MenuList';
import { StyledSearchbar } from './Searchbar.style';

const Searchbar = ({ onSearchSubmit, suggestions, options }) => {
	const [term, setTerm] = useState('');

	useEffect(() => {
		if (suggestions) {
			console.log('suggestiosnsnsn: ', suggestions);
		}
		if (term !== '') {
			onSearchSubmit(term);
		}
	}, [term]); // todo: https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook

	return (
		<StyledSearchbar>
			<div className="searchbar">
				<Select
					components={{ MenuList }}
					options={options}
					getOptionLabel={options => options['Company']}
					getOptionValue={options => options['Ticker']}
					backspaceRemovesValue={true}
					debounce={2}
				/>
				{/* <input
					className="searchbar-input"
					type="text"
					placeholder="Search ticker symbol"
					onChange={e => setTerm(e.target.value)}
				/> */}
			</div>
		</StyledSearchbar>
	);
};

export default Searchbar;
