import styled from 'styled-components';
import RecipeCard from '@/components/RecipeCard';

const PageContainer = styled.main`
	background-color: #ededed;
	flex: 1;
	padding: 64px 100px;
`;

const CardContainer = styled.div`
	--gap: 48px;

	display: flex;
	flex-wrap: wrap;
	gap: var(--gap);
`;

export default function Home() {
	return (
		<PageContainer>
			<CardContainer>
				<RecipeCard recipeId={1} />
				<RecipeCard recipeId={1} />
				<RecipeCard recipeId={1} />
				<RecipeCard recipeId={1} />
				<RecipeCard recipeId={1} />
				<RecipeCard recipeId={1} />
			</CardContainer>
		</PageContainer>
	);
}
