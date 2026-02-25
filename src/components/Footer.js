'use client';

import styled from 'styled-components';

const FooterContainer = styled.footer`
	padding: 58px;
	background-color: black;
	color: white;
	text-align: center;
`;

export default function Footer() {
	return (
		<FooterContainer>
			<p>Copyright © 2025 - Les Petits Plats</p>
		</FooterContainer>
	);
}
