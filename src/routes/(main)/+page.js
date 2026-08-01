import { getCollectionByHandle } from '$lib/queries/getCollections';
import { getHomePageQuery } from '$lib/queries/getPages';
import { shopifyFetch } from '$lib/shopify';
import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
	const data = await shopifyFetch(getHomePageQuery(), fetch);
	const { data: faves } = await shopifyFetch(
		getCollectionByHandle('favorites', 'Color', [], 'manual'),
		fetch
	);
	const { data: travelElevated } = await shopifyFetch(
		getCollectionByHandle('travel-elevated', 'Color', [], 'manual'),
		fetch
	);

	if (!data.data?.page) {
		error(404, {
			message: "Sorry, we traveled far and wide, but couldn't find the page you were looking for.",
			title: '404 Not Found'
		});
	}
	return { homeData: data.data?.page, faves, travelElevated };
}
