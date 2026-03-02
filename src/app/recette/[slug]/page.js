import { notFound } from 'next/navigation';
import recipes from '../../../../public/recipes.json';
import styled from 'styled-components';
import Image from 'next/image';

const PageContainer = styled.main`
	flex: 1;
	padding: 70px 90px;
	display: flex;
	gap: 82px;
	align-items: flex-start;
	max-width: 1200px;
	margin: 0 auto;
`;

const ImageSection = styled.div`
	flex: 0 0 50%;
	position: relative;
	border-radius: 20px;
	overflow: hidden;
	aspect-ratio: 25/35;
`;

const RecipeDetails = styled.div`
	flex: 1;

	h1 {
		font-size: 24px;
		color: #000;
		text-align: left;
		margin-bottom: 32px;
	}

	h2 {
		color: #7a7a7a;
		font-size: 16px;
		font-weight: 500;
		margin-top: 32px;
		margin-bottom: 16px;
	}

	p {
		line-height: 1.6;
	}
`;

const TimeTag = styled.div`
	background-color: #ffd15b;
	color: #000;
	border-radius: 100vh;
	padding: 8px 24px;
	font-size: 14px;
	display: inline-block;
`;

const IngredientsList = styled.div`
	--gap: 8px;

	display: flex;
	flex-wrap: wrap;
	gap: 24px var(--gap);
	margin-bottom: 24px;

	.ingredient {
		flex: 0 0 calc(100% / 3 - var(--gap) / 3 * 2);

		h5 {
			font-size: 16px;
			font-weight: 400;
		}

		span {
			font-size: 16px;
			color: #7a7a7a;
		}
	}
`;

const ItemsList = styled.div`
	--gap: 8px;

	display: flex;
	flex-wrap: wrap;
	gap: 24px var(--gap);
	margin-bottom: 24px;

	.item {
		flex: 0 0 calc(100% / 3 - var(--gap) / 3 * 2);

		h5 {
			font-size: 16px;
			font-weight: 400;
		}
	}
`;

export default async function RecipePage({ params }) {
	const { slug } = await params;
	const recipe_data = recipes.find(r => r.slug === slug);
	if (!recipe_data) notFound();

	console.log('Recipe Info:', recipe_data);

	return (
		<PageContainer>
			<ImageSection>
				<Image src={`/recipes/${recipe_data.image}`} alt={recipe_data.name} fill style={{ objectFit: 'cover' }} />
			</ImageSection>
			<RecipeDetails>
				<h1>{recipe_data.name}</h1>

				<h2>TEMPS DE PRÉPARATION</h2>
				<TimeTag>{recipe_data.time} min</TimeTag>

				<h2>INGRÉDIENTS</h2>
				<IngredientsList>
					{recipe_data.ingredients.map((ingredient, index) => (
						<div key={index} className="ingredient">
							<h5>{ingredient.ingredient}</h5>
							<span>
								{ingredient.quantity}
								{ingredient.unit ? ` ${ingredient.unit}` : ''}
							</span>
						</div>
					))}
				</IngredientsList>

				<h2>USTENSILES NÉCESSAIRES</h2>
				<ItemsList>
					{recipe_data.ustensils.map((ustensil, index) => (
						<div key={index} className="item">
							<h5>{ustensil}</h5>
						</div>
					))}
				</ItemsList>

				<h2>APPAREILS NÉCESSAIRES</h2>
				<ItemsList>
					<div className="item">
						<h5>{recipe_data.appliance}</h5>
					</div>
				</ItemsList>

				<h2>RECETTE</h2>
				<p>{recipe_data.description}</p>
			</RecipeDetails>
		</PageContainer>
	);
}
