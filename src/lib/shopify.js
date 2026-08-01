import { addToCartMutation, cartQuery, createCartMutation } from './queries/cartQueries';

const domain = import.meta.env.VITE_PUBLIC_SHOPIFY_DOMAIN;
const storefrontToken = import.meta.env.VITE_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

export async function shopifyFetch(query, fetchFn = fetch, variables = {}) {
	const response = await fetchFn(`https://${domain}/api/2025-07/graphql.json`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Shopify-Storefront-Access-Token': storefrontToken
		},
		body: JSON.stringify({ query, variables })
	});

	if (!response.ok) {
		throw new Error(`Shopify API error: ${response.statusText}`);
	}

	const data = await response.json();
	if (data?.errors?.length) {
		console.warn('Shopify API errors:', data.errors);
	}
	return data;
}

export async function getCart(cartId, fetch) {
	return shopifyFetch(cartQuery, fetch, { cartId });
}

export async function createCart(fetch) {
	return shopifyFetch(createCartMutation, fetch);
}

export async function addToCart(cartId, variantId, quantity = 1) {
	return shopifyFetch(addToCartMutation, window.fetch, {
		cartId,
		lines: [{ merchandiseId: variantId, quantity }]
	});
}
