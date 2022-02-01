import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { StyledSearchbar } from './Searchbar.style';

const Searchbar = ({ options }) => {
	const [showOptions, setShowOptions] = useState(false);
	const [selected, setSelected] = useState(undefined);
	const [tickerData, setTickerData] = useState(null);

	useEffect(() => {
		if (selected) {
			fetch('/tickerTimeSeries', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					ticker: selected.Ticker
				})
			})
				.then(res => res.json())
				.then(data => {
					data = data.reverse();
					data.forEach(item => (item.date = new Date(item.date)));

					if (data.length) {
						setTickerData(data);
					}
					if (tickerData) {
						console.log('there is tickerData', tickerData);
					}
				});
		}
	}, [selected]);

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
