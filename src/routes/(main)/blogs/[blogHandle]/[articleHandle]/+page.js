import { getBlogQuery } from '$lib/queries/blogQueries.js';
import { shopifyFetch } from '$lib/shopify';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const blogHandle = params?.blogHandle;
	const articleHandle = params?.articleHandle;
	if (!blogHandle || !articleHandle) {
		error(404, {
			message: "Sorry, we traveled far and wide, but couldn't find the page you were looking for.",
			title: '404 Not Found'
		});
	}

	const data = await shopifyFetch(getBlogQuery(params.blogHandle, params.articleHandle), fetch);
	const blog = data.data.blog.articleByHandle;

	if (!blog) {
		error(404, {
			message: "Sorry, we traveled far and wide, but couldn't find the blog you were looking for.",
			title: '404 Not Found'
		});
	}

	return { blog };
}
