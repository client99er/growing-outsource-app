import { getPolicies } from '$lib/queries/getPolicies.js';
import { shopifyFetch } from '$lib/shopify';

export async function load({ fetch }) {
	const data = await shopifyFetch(getPolicies(), fetch);

	return { terms: data.data.shop.termsOfService || {} };
}
