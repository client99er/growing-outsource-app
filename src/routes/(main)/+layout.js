import { createCart, getCart, shopifyFetch } from '$lib/shopify.js';
import { getMenuQuery } from '$lib/queries/getMenus.js';
import { getShopQuery } from '$lib/queries/getShop.js';
import { getCartId, setCartId } from '$lib/cartStorage.js';
import { browser } from '$app/environment';
import { extractReasonTo } from '$lib/util/reasonsTo';

export async function load({ fetch }) {
	const [dataMenu, dataShop] = await Promise.all([
		shopifyFetch(getMenuQuery('main-menu'), fetch),
		shopifyFetch(getShopQuery(), fetch)
	]);

	// Get Reasons To
	const reasonsTo = await extractReasonTo(dataShop, fetch);

	// Create cart if doesn't exist
	let cartData = null;
	if (browser) {
		let cartId = getCartId();
		if (!cartId) {
			const { data } = await createCart(fetch);
			cartId = data.cartCreate.cart.id; // cart.checkoutUrl
			setCartId(cartId);
		}
		cartData = await getCart(cartId, fetch);
		if (!cartData?.data?.cart) {
			setCartId('');
			const { data } = await createCart(fetch);
			cartId = data.cartCreate.cart.id; // cart.checkoutUrl
			setCartId(cartId);
			cartData = await getCart(cartId, fetch);
		}
	}

	return {
		menu: dataMenu.data.main?.items || [],
		shop: dataShop.data.shop?.metafield || {},
		cartData,
		reasonsTo,
		footerMenus: {
			shop: dataMenu.data.footerShop?.items || [],
			about: dataMenu.data.footerAbout?.items || [],
			help: dataMenu.data.footerHelp?.items || []
		}
	};
}
