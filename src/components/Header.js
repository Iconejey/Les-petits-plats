'use client';

import Image from 'next/image';
import styled from 'styled-components';

const LogoContainer = styled.div`
	display: flex;
	align-items: center;
	height: 128px;
	padding: 0 64px;
`;

const TitleSearchContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 32px;
	padding: 128px 64px;
`;

const SearchInputContainer = styled.div`
	padding: 12px;
	padding-left: 32px;
	border-radius: 12px;
	width: 100%;
	background-color: white;
	display: flex;
	align-items: stretch;
	max-width: 950px;

	input {
		flex: 1;
		border: none;
		outline: none;
		font-size: 16px;
	}

	button {
		background-color: #1b1b1b;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 52px;
		height: 52px;
		border-radius: 8px;
	}
`;

export default function Header() {
	return (
		<header style={{ backgroundImage: 'url(/header.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
			<LogoContainer>
				<Image src="/logo les petits plats.svg" alt="Les Petits Plats" width={180} height={25} />
			</LogoContainer>
			<TitleSearchContainer>
				<h1>
					DÉCOUVREZ NOS RECETTES
					<br />
					DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES
				</h1>
				<SearchInputContainer>
					<input type="text" placeholder="Rechercher une recette..." suppressHydrationWarning />
					<button>
						<Image src="/search-icon.svg" alt="Search" width={28} height={28} />
					</button>
				</SearchInputContainer>
			</TitleSearchContainer>
		</header>
	);
}
