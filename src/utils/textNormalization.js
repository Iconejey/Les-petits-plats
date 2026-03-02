/**
 * Normalize text for search comparison
 * - Converts to lowercase
 * - Removes accents/diacritics
 * - Trims whitespace
 */
export const normalizeText = text => {
	if (!text) return '';

	return text
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '') // Remove diacritics
		.trim();
};

/**
 * Check if text matches the search query
 * - Both texts are normalized
 * - Search uses includes() for partial matching
 */
export const matchesSearch = (text, query) => {
	if (!query || query.length < 3) return true; // Show all if query is too short

	const normalizedText = normalizeText(text);
	const normalizedQuery = normalizeText(query);

	return normalizedText.includes(normalizedQuery);
};
