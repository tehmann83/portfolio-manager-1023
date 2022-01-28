import styled from 'styled-components';

export const StyledSearchbar = styled.div`
	.searchbar {
		width: 100%;
		padding: 5%;
		padding-top: 0;
	}

	.searchbar-input {
		width: 100%;
		padding: 1.5%;
		border-radius: 5px;
		border: solid 1px lightblue;
		background-color: rgba(255, 255, 255, 0.13);
		font-size: 1em;
	}

	.searchbar-input:focus,
	.searchbar-input:active {
		border: solid 1px blue;
		outline: none;
	}

	@media only screen and (max-width: 480px) {
		.searchbar-input {
			padding: 5%;
		}
	}
`;