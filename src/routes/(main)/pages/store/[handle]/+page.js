import { error } from '@sveltejs/kit';
import { theme } from '$lib/config/theme.js';

export async function load({ params }) {
	const handle = params?.handle;
	if (!handle) {
		error(404, {
			message: "Sorry, we traveled far and wide, but couldn't find the page you were looking for.",
			title: '404 Not Found'
		});
	}

	// If handle does not exist from theme.stores, throw 404.
	const store = theme.stores.find((store) => store.link === `/${handle}`);

	if (!store) {
		throw error(404, {
			message: "Sorry, we traveled far and wide, but couldn't find the page you were looking for.",
			title: '404 Not Found'
		});
	}

	return { store };
}
