import { getPageQuery } from '$lib/queries/getPages';
import { shopifyFetch } from '$lib/shopify';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const handle = params?.handle;
	if (!handle) {
		error(404, {
			message: "Sorry, we traveled far and wide, but couldn't find the page you were looking for.",
			title: '404 Not Found'
		});
	}

	const data = await shopifyFetch(getPageQuery(handle), fetch);
	if (!data.data?.page) {
		error(404, {
			message: "Sorry, we traveled far and wide, but couldn't find the page you were looking for.",
			title: '404 Not Found'
		});
	}

	return { page: data.data?.page };
}
