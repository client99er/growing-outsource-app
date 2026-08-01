import { getAllCollections } from '$lib/queries/getCollections.js';
import { getMediaImages } from '$lib/queries/getMediaImages.js';
import { shopifyFetch } from '$lib/shopify';

export async function load({ fetch }) {
	const { data } = await shopifyFetch(getAllCollections, fetch);
	const collections = data.collections.edges.filter((collection) => {
		const main = collection.node.metafields.find(
			(m) => m?.key === 'is_main_category' && m.value === 'true'
		);
		return Boolean(main);
	});

	const mappedCollections = await Promise.all(
		collections.map(async (main) => {
			let photos = main.node.metafields.find((m) => m?.key === 'main_category_photos');

			photos = JSON.parse(photos.value);
			const res = await shopifyFetch(getMediaImages, fetch, { ids: photos });

			return {
				title: main.node.title,
				description: main.node.description,
				handle: main.node.handle,
				photos: res?.data?.nodes ?? []
			};
		})
	);

	return { collections: mappedCollections, recommended: data.products };
}
