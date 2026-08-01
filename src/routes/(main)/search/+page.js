import { shopifyFetch } from '$lib/shopify';
import { getSearchProductsQuery } from '$lib/queries/getProducts';

import { error } from '@sveltejs/kit';

export async function load({ url, fetch }) {
	const query = url.searchParams.get('query');
	if (!query) {
		error(404, {
			message: "Sorry, we traveled far and wide, but couldn't find the page you were looking for.",
			title: '404 Not Found'
		});
	}

	const sortBy = url.searchParams.get('sort_by') || 'price-asc';

	const colors = url.searchParams
		.get('colors')
		?.split(',')
		.map((c) => c.trim());

	const data = await shopifyFetch(getSearchProductsQuery(query, sortBy), fetch);
	let products = data.data.products.edges.map((edge) => edge.node);

	// 🔑 filter locally by colors if provided
	if (colors && colors.length > 0) {
		products = products.filter((product) =>
			product.variants.edges.some((variant) =>
				colors.includes(variant.node.selectedOptions.find((opt) => opt.name === 'Color')?.value)
			)
		);
	}

	return { products, query, colors, sortBy };
}
