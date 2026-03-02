import styled from 'styled-components';
import RecipeCard from '@/components/RecipeCard';
import recipes from '../../public/recipes.json';

const PageContainer = styled.main`
	background-color: #ededed;
	flex: 1;
	padding: 70px 90px;
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
				{recipes.map(recipe => (
					<RecipeCard key={recipe.id} recipe={recipe} />
				))}
			</CardContainer>
		</PageContainer>
	);
}
