import { shopifyFetch } from '$lib/shopify';
import { getAllBlogsQuery } from '$lib/queries/blogQueries.js';

export const load = async ({ fetch }) => {
	const data = await shopifyFetch(getAllBlogsQuery(), fetch);

	return {
		blogs: data?.data?.blogs?.edges?.map((edge) => edge.node) ?? []
	};
};
