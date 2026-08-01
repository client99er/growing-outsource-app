import { getMediaImages } from '$lib/queries/getMediaImages';
import { shopifyFetch } from '$lib/shopify';

export async function extractReasonTo(data, fetch) {
	// Get specific metafield: reasons_to_reference
	const reasonsToData = data.data.shop.metafields.find((m) => m?.key === 'reasons_to_reference');
	let imageIds = [];
	// Image is a separate fetching
	if (reasonsToData) {
		const images = reasonsToData.reference.fields.find((f) => f?.key === 'reason_images');
		if (images) imageIds = JSON.parse(images.value);
		const res = await shopifyFetch(getMediaImages, fetch, { ids: imageIds });
		imageIds = res.data.nodes;
	} else return [];

	// Extract each field from the metaobject
	let reasonsTo = [];
	let headers = reasonsToData.reference.fields.find((f) => f?.key === 'reason_headers');
	if (headers) headers = JSON.parse(headers.value);
	let descriptions = reasonsToData.reference.fields.find((f) => f?.key === 'reason_descriptions');
	if (descriptions) descriptions = JSON.parse(descriptions.value);

	// Construct desired shape
	for (const [i, image] of imageIds.entries()) {
		reasonsTo.push({
			header: headers?.[i] ?? '',
			description: descriptions?.[i] ?? '',
			url: image.image.url,
			altText: image.image.altText
		});
	}

	return reasonsTo;
}
