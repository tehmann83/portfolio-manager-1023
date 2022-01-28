import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

export const StockSymbolsContext = createContext();

const getSymbols = async () => {
	return await axios.get('/tickerSymbols');
};

export function StockSymbolsContextProvider({ children }) {
	/* const [symbols, setSymbols] = useState(getSymbols().then(res => res.data)); */
	const [symbols, setSymbols] = useState([]);

	useEffect(() => {
		getSymbols().then(res => {
			setSymbols(res.data);
		});
	}, []);

	return (
		<StockSymbolsContext.Provider value={{ symbols }}>
			{children}
		</StockSymbolsContext.Provider>
	);
}

export function useStockSymbols() {
	return useContext(StockSymbolsContext);
}
