'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { useUI } from '@/app/UIContext';

const HeaderContainer = styled.header`
	--dark-overlay: 0.3;
	background-image: linear-gradient(rgba(0, 0, 0, var(--dark-overlay)), rgba(0, 0, 0, var(--dark-overlay))), url('/header.jpg');
	background-size: cover;
	background-position: center;
	display: flex;
	flex-direction: column;

	&.error {
		flex: 1;
		--dark-overlay: 0.6;
	}
`;

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

const ErrorContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	h1 {
		font-size: 96px;
		margin-bottom: 32px;
	}

	h2 {
		font-family: var(--font-anton);
		color: white;
		font-weight: 400;
		font-size: 48px;
	}
`;

export default function Header() {
	const pathname = usePathname();
	const { isError, searchQuery, setSearchQuery } = useUI();
	let type = 'search';

	if (isError) type = '404';
	else if (pathname.startsWith('/recette/')) type = 'recipe';

	return (
		<HeaderContainer className={isError ? 'error' : ''}>
			<LogoContainer>
				<Image src="/logo les petits plats.svg" alt="Les Petits Plats" width={180} height={25} />
			</LogoContainer>

			{type === 'search' && (
				<TitleSearchContainer>
					<h1>
						DÉCOUVREZ NOS RECETTES
						<br />
						DU QUOTIDIEN, SIMPLES ET DÉLICIEUSES
					</h1>
					<SearchInputContainer>
						<input type="text" placeholder="Rechercher une recette..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} suppressHydrationWarning />
						<button>
							<Image src="/search-icon.svg" alt="Search" width={28} height={28} />
						</button>
					</SearchInputContainer>
				</TitleSearchContainer>
			)}

			{type === '404' && (
				<ErrorContainer>
					<h1>404 :(</h1>
					<h2>La page que vous demandez est introuvable.</h2>
				</ErrorContainer>
			)}
		</HeaderContainer>
	);
}
