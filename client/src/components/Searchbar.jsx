import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { StyledSearchbar } from './Searchbar.style';

const Searchbar = ({ options, onChange }) => {
	const [showOptions, setShowOptions] = useState(false);
	const [selected, setSelected] = useState(undefined);
	const [tickerData, setTickerData] = useState(null);

	useEffect(() => {
		console.log('selected: ', selected);
		if (selected) {
			onChange(selected.Ticker);
		}
	}, [selected, onChange]);

	const inputEntered = txt => {
		if (txt.length > 1) {
			setShowOptions(true);
		} else if (txt.length <= 1) {
			setShowOptions(false);
		}
	};

	const handleChange = selectedOption => {
		setSelected(selectedOption);
	};

	return (
		<StyledSearchbar>
			<div className="searchbar">
				<Select
					/* components={{ MenuList }} */
					options={!showOptions ? [] : options}
					getOptionLabel={options =>
						`${options['Ticker']} - ${options['Company']}`
					}
					getOptionValue={options => options['Ticker']}
					backspaceRemovesValue={true}
					onInputChange={e => inputEntered(e)}
					onChange={handleChange}
					isClearable={true}
				/>
				<div className="search-result">
					<span>
						{!selected ? '' : `${selected.Ticker} - ${selected.Company}`}
					</span>
				</div>
			</div>
		</StyledSearchbar>
	);
};

export default Searchbar;
