import { getCollectionByHandle } from '$lib/queries/getCollections.js';
import { shopifyFetch } from '$lib/shopify';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch, url }) {
	const sortBy = url.searchParams.get('sort_by') || 'manual';

	const colors = url.searchParams
		.get('colors')
		?.split(',')
		.map((c) => c.trim());

	const handle = params?.handle;
	if (!handle) {
		error(404, {
			message: "Sorry, we traveled far and wide, but couldn't find the page you were looking for.",
			title: '404 Not Found'
		});
	}

	const { data } = await shopifyFetch(
		getCollectionByHandle(handle, 'Color', colors ?? [], sortBy),
		fetch
	);

	if (!data.collection) {
		error(404, {
			message: "Sorry, we traveled far and wide, but couldn't find the page you were looking for.",
			title: '404 Not Found'
		});
	}

	return { data, colors, sortBy };
}
