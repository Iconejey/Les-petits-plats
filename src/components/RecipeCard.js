import styled from 'styled-components';
import Image from 'next/image';

const Card = styled.div`
	background-color: #fff;
	border-radius: 20px;
	overflow: hidden;
	flex: 0 0 calc(100% / 3 - var(--gap) / 3 * 2);
`;

const CardHeader = styled.div`
	aspect-ratio: 38/25;
	position: relative;
`;

const TimeTag = styled.div`
	position: absolute;
	right: 8px;
	top: 8px;
	background-color: #ffd15b;
	color: #000;
	border-radius: 100vh;
	padding: 4px 16px;
	font-size: 12px;
`;

const CardContent = styled.div`
	padding: 32px 24px;

	h3 {
		font-family: var(--font-anton);
	}

	h4 {
		margin-top: 24px;
		color: #7a7a7a;
		font-size: 14px;
	}

	p {
		margin-top: 16px;
	}
`;

const IngredientsList = styled.div`
	--gap: 8px;

	display: flex;
	flex-wrap: wrap;
	gap: 24px var(--gap);
	margin-top: 16px;

	.ingredient {
		flex: 0 0 calc(50% - var(--gap) / 2);

		h5 {
			font-size: 14px;
			font-weight: 400;
		}

		span {
			font-size: 14px;
			color: #7a7a7a;
		}
	}
`;

export default function RecipeCard({ recipe }) {
	return (
		<Card>
			<CardHeader>
				<Image src={`/recipes/${recipe.image}`} alt={recipe.name} fill objectFit="cover" />
				<TimeTag>{recipe.time}min</TimeTag>
			</CardHeader>
			<CardContent>
				<h3>{recipe.name}</h3>

				<h4>RECETTE</h4>

				<p>{recipe.description}</p>

				<h4>INGRÉDIENTS</h4>

				<IngredientsList>
					{recipe.ingredients &&
						recipe.ingredients.map((ingredient, index) => (
							<div key={index} className="ingredient">
								<h5>{ingredient.ingredient}</h5>
								<span>
									{ingredient.quantity}
									{ingredient.unit ? ` ${ingredient.unit}` : ''}
								</span>
							</div>
						))}
				</IngredientsList>
			</CardContent>
		</Card>
	);
}
