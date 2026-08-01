export function getCartId() {
	if (typeof localStorage !== 'undefined') {
		return localStorage.getItem('shopify_cart_id');
	}
}

export function setCartId(id) {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('shopify_cart_id', id);
	}
}
