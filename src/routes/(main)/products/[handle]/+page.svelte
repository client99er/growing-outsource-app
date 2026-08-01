<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Breadcrumb from '$lib/custom/breadcrumb.svelte';
	import { onMount, tick } from 'svelte';
	import ProductImages from './product-images.svelte';
	import BlackButton from '$lib/custom/black-button.svelte';
	import ProductDetails from './product-details.svelte';
	import { getCartId } from '$lib/cartStorage';
	import { addToCart } from '$lib/shopify';
	import { Loader2 } from 'lucide-svelte';
	import { cart } from '$lib/stores/cart.svelte';
	import { colorMap } from '$lib/util/colors';

	let { data } = $props();
	let { product, recommendations } = data;
	const selectedVariant = $derived(data.selectedVariant);

	// Upload all variants in the product itself
	// Tag one image from particular variant (black) as the default click image on carousel
	// Do this by matching alt with the color name (alt=Jet Black)
	const selectableImages = $derived(product.images.nodes);
	let productImagesRef;

	// Breadcrumbs
	const collection = $derived(
		product.metafields.find((m) => m?.key === 'breadcrumb')?.reference || {}
	);
	const breadcrumbs = $derived(
		collection
			? [
					{
						label: 'Home',
						href: `/`
					},
					{
						label: collection.title,
						href: `/collections/${collection.handle}`
					},
					{
						label: product.title
					}
				]
			: []
	);

	const colors = $derived(product.options.find((o) => o.name === 'Color')?.values || []);
	const selectedColor = $derived(
		selectedVariant.selectedOptions.find((o) => o.name === 'Color')?.value || ''
	);

	// Handles color and size selection, finds the correct variant, and updates the URL
	function onOptionClick(optionType, value) {
		// Get current selected options
		let currentColor = selectedColor;
		let currentSize = selectedSize;
		// Scroll to color
		if (
			optionType === 'Color' &&
			productImagesRef &&
			typeof productImagesRef.scrollToColor === 'function'
		) {
			productImagesRef.scrollToColor(value);
		}
		if (optionType === 'Color') currentColor = value;
		if (optionType === 'Size') currentSize = value;

		// Find the variant that matches selected options
		const variant = product.variants.edges.find((v) => {
			const opts = v.node.selectedOptions;
			const colorMatch = opts.find((o) => o.name === 'Color')?.value === currentColor;
			// If there is a Size option, match it, otherwise ignore
			const hasSize = opts.some((o) => o.name === 'Size');
			const sizeMatch = hasSize ? opts.find((o) => o.name === 'Size')?.value === currentSize : true;
			return colorMatch && sizeMatch;
		});
		if (variant) {
			const variantId = variant.node.id.split('/').pop();

			// Preserve scroll state
			const scrollY = window.scrollY;
			goto(`?variant=${variantId}`, { replaceState: true, noscroll: true }).then(() => {
				window.scrollTo(0, scrollY);
			});
		}
	}

	// Sizes
	const sizes = $derived(product.options.find((o) => o.name === 'Size')?.values || []);
	const selectedSize = $derived(
		selectedVariant.selectedOptions.find((o) => o.name === 'Size')?.value || ''
	);

	// Feature
	const features = product.metafields.find((m) => m?.key === 'features');

	// Warranty & returns
	const warranty = product.metafields.find((m) => m?.key === 'warranty_and_returns');

	// Cart handling
	let cartLoading = $state(false);
	async function handleAddToCart() {
		cartLoading = true;
		const cartData = await addToCart(getCartId(), selectedVariant.id); // ✅ safe now
		const quantity = cartData.data.cartLinesAdd.cart.lines.edges.reduce(
			(total, line) => total + line.node.quantity,
			0
		);
		cart.count = quantity;
		cartLoading = false;
		goto('/cart');
	}

	const formatter = new Intl.NumberFormat('en-PH', {
		style: 'currency',
		currency: 'PHP',
		minimumFractionDigits: 2
	});
</script>

<main class="mx-auto 2xl:max-w-[114rem]" itemscope itemtype="https://schema.org/Product">
	<div class="flex flex-col lg:flex-row">
		<ProductImages
			{selectableImages}
			onReady={() => productImagesRef.scrollToColor(selectedColor)}
			bind:this={productImagesRef}
		/>
		<div class="mx-5 grow text-neutral-800 lg:ml-10">
			<section>
				<Breadcrumb links={breadcrumbs} />
				<h1 class="mt-2 font-serif text-2xl font-semibold tracking-tight md:text-3xl lg:mt-10">
					{product.title}
				</h1>
				<!-- SEO-friendly price -->
				<p itemprop="offers" class="mt-4" itemscope itemtype="https://schema.org/Offer">
					<span class="text-lg font-light" itemprop="priceCurrency" content="PHP"></span>
					<span class="text-lg font-light" itemprop="price" content={selectedVariant.price.amount}
						>{formatter.format(selectedVariant.price.amount)}</span
					>
					{#if selectedVariant.compareAtPrice != null}
						<span
							class="ml-2 text-lg font-light text-neutral-500 line-through"
							itemprop="price"
							content={selectedVariant.compareAtPrice.amount}
							>{formatter.format(selectedVariant.compareAtPrice.amount)}</span
						>
					{/if}
					{#if !selectedVariant.availableForSale}
						<span class="ml-6 text-sm text-red-500">Out of stock</span>
					{/if}
					<link itemprop="availability" href="https://schema.org/InStock" />
				</p>
				<hr class="mt-8 text-neutral-300" />
				<fieldset class="m-0 mt-4 border-0 p-0">
					<legend class="m-0 p-0 text-base font-normal"
						>Color:
						<span class="text-sm">{selectedColor}</span>
					</legend>
					<div class="mt-2 flex space-x-4">
						{#each colors as color}
							<button
								onclick={() => onOptionClick('Color', color)}
								aria-label={color}
								class="{color === selectedColor
									? 'border'
									: ''} h-7 w-7 cursor-pointer rounded-full p-[2px] transition-transform hover:scale-110"
							>
								<div
									class="h-full w-full rounded-full {color === 'White'
										? 'border-[1px] border-slate-200'
										: ''}"
									style="background-color: {colorMap[color]}"
								></div>
							</button>
						{/each}
					</div>
				</fieldset>
				{#if sizes.length > 0}
					<fieldset class="m-0 mt-6 border-0 p-0">
						<legend class="m-0 p-0 text-base font-normal"
							>Size:
							<span class="text-sm">{selectedSize}</span>
						</legend>
						<div class="mt-2 flex space-x-4">
							{#each sizes as size}
								<button
									onclick={() => onOptionClick('Size', size)}
									aria-label={size}
									class="{selectedSize === size
										? 'bg-gray-400'
										: 'bg-gray-200'} flex h-7 w-7 cursor-pointer items-center justify-center rounded py-4 transition-transform hover:scale-110"
								>
									{size}
								</button>
							{/each}
						</div>
					</fieldset>
				{/if}
				<BlackButton
					disabled={!selectedVariant.availableForSale || cartLoading}
					onclick={handleAddToCart}
					class="mt-16 "
				>
					{#if cartLoading}
						<div class="flex justify-center">
							<Loader2 class="animate-spin" />
						</div>
					{:else}
						<span>ADD TO CART - {formatter.format(selectedVariant.price.amount)}</span>
					{/if}
				</BlackButton>
			</section>
			<section class="prose mt-10 text-neutral-600" aria-labelledby="product-description-heading">
				<h2 id="product-description-heading" class="font-serif text-lg text-neutral-800">
					Product Description
				</h2>
				<div itemprop="description" class="break-words">
					{@html product.descriptionHtml}
				</div>
			</section>
		</div>
	</div>
	<div class="mx-10">
		<ProductDetails description={product.descriptionHtml} {features} {warranty} />
	</div>
	<!-- {JSON.stringify(recommendations)} -->
</main>
