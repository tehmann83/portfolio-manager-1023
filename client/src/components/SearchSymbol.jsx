import React from 'react';

const SearchSymbol = ({ symbol }) => {
	return (
		<div className="symbol-container">
			<p className="symbol">"{symbol}"</p>
			<p className="symbol-author">
				<span className="highlight"> {symbol.ticker} </span>-
				<span className="highlight"> {symbol.company}</span>
			</p>
		</div>
	);
};

export default SearchSymbol;
