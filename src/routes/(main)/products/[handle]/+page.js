import { getProductByHandleQuery, getRecommendationsQuery } from '$lib/queries/getProducts';
import { shopifyFetch } from '$lib/shopify';
import { error } from '@sveltejs/kit';

export async function load({ params, url, fetch }) {
	const handle = params?.handle;
	if (!handle) {
		error(404, 'Product handle is required');
	}

	const productData = await shopifyFetch(getProductByHandleQuery(handle), fetch);
	if (productData.errors?.length > 0) {
		error(500, productData.errors[0].message);
	}
	const product = productData?.data?.productByHandle;
	if (!product) {
		error(404, 'Product not found');
	}

	// Step 2: Get recommendations using product.id
	const recoData = await shopifyFetch(getRecommendationsQuery(product.id), fetch);
	const recommendations = recoData?.data?.productRecommendations || [];

	// Optional: Limit recommendations
	const limitedRecos = recommendations.slice(0, 4);

	// Step 3: Variant selection
	const variantId = url.searchParams.get('variant');
	const selectedVariant =
		product.variants?.edges.find((v) => v.node.id.split('/').pop() === variantId)?.node ||
		product.variants?.edges[0]?.node;

	return {
		product,
		selectedVariant,
		recommendations: limitedRecos
	};
}
