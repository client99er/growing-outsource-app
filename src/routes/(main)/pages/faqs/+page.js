import { getFaqPageQuery } from '$lib/queries/getPages';
import { shopifyFetch } from '$lib/shopify';
import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
	const data = await shopifyFetch(getFaqPageQuery(), fetch);

	if (!data.data?.page) {
		error(404, {
			message: "Sorry, we traveled far and wide, but couldn't find the page you were looking for.",
			title: '404 Not Found'
		});
	}

	return { items: data.data?.page };
}
