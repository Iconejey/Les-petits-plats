'use client';

import { useState, useMemo } from 'react';
import styled from 'styled-components';
import RecipeCard from '@/components/RecipeCard';
import AdvancedSelect from '@/components/AdvancedSelect';
import recipes from '../../public/recipes.json';

const PageContainer = styled.main`
	background-color: #ededed;
	flex: 1;
	padding: 70px 90px;
`;

const TopSection = styled.div`
	display: flex;
	gap: 24px;
	align-items: center;
	margin-bottom: 48px;

	@media (max-width: 968px) {
		flex-direction: column;
	}
`;

const FiltersContainer = styled.div`
	display: flex;
	gap: 24px;
	flex: 1;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const FilterWrapper = styled.div`
	width: 200px;
`;

const RecipeCount = styled.h2`
	font-size: 24px;
	font-weight: 400;
	font-family: var(--font-anton);
	color: #1b1b1b;
	white-space: nowrap;
	margin: 0;
`;

const CardContainer = styled.div`
	--gap: 48px;

	display: flex;
	flex-wrap: wrap;
	gap: var(--gap);
`;

export default function Home() {
	const [selected_ingredients, setSelectedIngredients] = useState([]);
	const [selected_appliance, setSelectedAppliance] = useState([]);
	const [selected_ustensils, setSelectedUstensils] = useState([]);

	// Extract unique values from recipes
	const all_ingredients = useMemo(() => {
		const ingredients_set = new Set();
		recipes.forEach(recipe => {
			recipe.ingredients.forEach(ing => {
				ingredients_set.add(ing.ingredient);
			});
		});
		return Array.from(ingredients_set).sort();
	}, []);

	const all_appliances = useMemo(() => {
		const appliances_set = new Set();
		recipes.forEach(recipe => {
			if (recipe.appliance) {
				appliances_set.add(recipe.appliance);
			}
		});
		return Array.from(appliances_set).sort();
	}, []);

	const all_ustensils = useMemo(() => {
		const ustensils_set = new Set();
		recipes.forEach(recipe => {
			recipe.ustensils.forEach(ustensil => {
				ustensils_set.add(ustensil);
			});
		});
		return Array.from(ustensils_set).sort();
	}, []);

	// Filter recipes based on selected filters
	const filtered_recipes = useMemo(() => {
		return recipes.filter(recipe => {
			// Check ingredients filter
			if (selected_ingredients.length > 0) {
				const recipe_ingredients = recipe.ingredients.map(ing => ing.ingredient);
				const has_all_ingredients = selected_ingredients.every(selected => recipe_ingredients.includes(selected));
				if (!has_all_ingredients) return false;
			}

			// Check appliance filter
			if (selected_appliance.length > 0) {
				if (!selected_appliance.includes(recipe.appliance)) return false;
			}

			// Check ustensils filter
			if (selected_ustensils.length > 0) {
				const has_all_ustensils = selected_ustensils.every(selected => recipe.ustensils.includes(selected));
				if (!has_all_ustensils) return false;
			}

			return true;
		});
	}, [selected_ingredients, selected_appliance, selected_ustensils]);

	return (
		<PageContainer>
			<TopSection>
				<FiltersContainer>
					<FilterWrapper>
						<AdvancedSelect title="Ingrédients" options={all_ingredients} selected_values={selected_ingredients} onSelectionChange={setSelectedIngredients} />
					</FilterWrapper>
					<FilterWrapper>
						<AdvancedSelect title="Appareils" options={all_appliances} selected_values={selected_appliance} onSelectionChange={setSelectedAppliance} />
					</FilterWrapper>
					<FilterWrapper>
						<AdvancedSelect title="Ustensiles" options={all_ustensils} selected_values={selected_ustensils} onSelectionChange={setSelectedUstensils} />
					</FilterWrapper>
				</FiltersContainer>
				<RecipeCount>{filtered_recipes.length} recettes</RecipeCount>
			</TopSection>

			<CardContainer>
				{filtered_recipes.map(recipe => (
					<RecipeCard key={recipe.id} recipe={recipe} />
				))}
			</CardContainer>
		</PageContainer>
	);
}
