import { getCart } from '$lib/shopify.js';
import { getCartId } from '$lib/cartStorage.js';
import { browser } from '$app/environment';

export async function load({ fetch, depends }) {
	depends('app:cart');

	let cartData = null;
	if (browser) {
		let cartId = getCartId();
		cartData = await getCart(cartId, fetch);
	}

	return {
		cartData
	};
}
