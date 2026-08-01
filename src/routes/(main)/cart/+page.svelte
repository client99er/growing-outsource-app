<script>
	import { invalidate } from '$app/navigation';
	import { getCartId } from '$lib/cartStorage';
	import { removeCartItemMutation } from '$lib/queries/cartQueries';
	import { addToCart, shopifyFetch } from '$lib/shopify';
	import { Loader } from 'lucide-svelte';
	import CartEmpty from './cart-empty.svelte';
	import CartQtyButton from './cart-qty-button.svelte';
	import { cart as cartStore } from '$lib/stores/cart.svelte';
	import BlackButton from '$lib/custom/black-button.svelte';
	import WhiteButton from '$lib/custom/white-button.svelte';

	let { data } = $props();

	const cart = $derived(data.cartData?.data?.cart);
	const empty = $derived(cart?.totalQuantity <= 0);
	const lines = $derived(cart?.lines?.edges?.map((e) => e.node) ?? []);
	// Add loading state for each product
	const recommended = $state(
		data?.cartData?.data?.products?.edges?.map((e) => ({
			...e.node,
			loading: false
		})) ?? []
	);

	// Update cart store
	$effect(() => {
		cartStore.count = cart?.totalQuantity;
	});

	const formatter = new Intl.NumberFormat('en-PH', {
		style: 'currency',
		currency: 'PHP',
		minimumFractionDigits: 2
	});

	let removing = $state(false);
	export async function removeItem(lineId) {
		removing = true;
		const cartId = getCartId();
		if (!cartId) return;

		await shopifyFetch(removeCartItemMutation, fetch, { cartId, lineIds: [lineId] });

		await invalidate('app:cart'); // triggers re-run of cart load function
		removing = false;
	}

	// Handle upsell add to cart
	let addingToCart = $state(false);
	async function handleAddToCart(product) {
		product.loading = true;
		const id = product.variants.edges[0]?.node.id;
		const cartData = await addToCart(getCartId(), id);
		const quantity = cartData.data.cartLinesAdd.cart.lines.edges.reduce(
			(total, line) => total + line.node.quantity,
			0
		);
		cartStore.count = quantity;
		product.loading = false;
		invalidate('app:cart');
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<main class="mx-auto pt-20 pb-40">
	<div class="mx-4 sm:mx-6 md:mx-10">
		<div class="text-neutral-800">
			{#if !empty}
				<h1 class="relative max-w-max font-serif text-3xl font-light tracking-wide">
					Your Cart
					<span class="absolute -top-2 -right-5 !font-sans text-lg text-neutral-500">
						{cart?.totalQuantity}
					</span>
				</h1>
			{/if}

			<section>
				{#if empty}
					<CartEmpty />
				{:else}
					<!-- Desktop Table Header -->
					<div
						class="mt-14 hidden grid-cols-4 gap-4 border-b border-neutral-300 pb-2 text-sm font-light text-gray-500 md:grid"
					>
						<div></div>
						<div class="text-right">Price</div>
						<div class="text-center">Qty</div>
						<div class="text-right">Total</div>
					</div>

					{#each lines as line (line.id)}
						<!-- Desktop Row -->
						<div
							class="hidden grid-cols-4 items-center gap-4 border-b border-neutral-200 py-4 md:grid"
						>
							<!-- Image and title -->
							<div class="flex items-center gap-4">
								<img
									src={line.merchandise.product.featuredImage.url}
									alt={line.merchandise.title}
									class="h-16 w-16 rounded object-cover"
								/>
								<div>
									<p class="font-semibold text-nowrap text-gray-800">
										{line.merchandise.product.title}
									</p>
									<p class="text-sm text-gray-500">{line.merchandise.title}</p>
									<button
										onclick={() => removeItem(line.id)}
										disabled={removing}
										class="mt-3 text-xs text-gray-400 hover:text-red-400 hover:underline disabled:hover:text-gray-400 disabled:hover:no-underline"
									>
										{#if removing}
											<Loader class="w-5 animate-spin" />
										{:else}
											Remove
										{/if}
									</button>
								</div>
							</div>

							<!-- Price -->
							<div class="text-right text-gray-800">
								{formatter.format(line.merchandise.price.amount)}
							</div>

							<!-- Quantity -->
							<div class="text-center">
								<CartQtyButton lineId={line.id} quantity={line.quantity} />
							</div>

							<!-- Total -->
							<div class="text-right">
								{formatter.format(line.merchandise.price.amount * line.quantity)}
							</div>
						</div>

						<!-- Mobile Layout -->
						<div class="flex flex-col gap-2 border-b border-neutral-200 py-6 md:hidden">
							<div class="flex gap-4">
								<img
									src={line.merchandise.product.featuredImage.url}
									alt={line.merchandise.title}
									class="h-20 w-20 shrink-0 rounded object-cover"
								/>
								<div class="flex-1">
									<p class="font-semibold text-gray-800">{line.merchandise.product.title}</p>
									<p class="text-sm text-gray-500">{line.merchandise.title}</p>
									<div class="mt-2 flex items-center justify-between">
										<span class="text-sm text-gray-600">
											{formatter.format(line.merchandise.price.amount)}
										</span>
										<CartQtyButton quantity={line.quantity} />
									</div>
								</div>
							</div>
							<div class="mt-2 flex items-center justify-between text-sm">
								<span class="text-gray-500">Total</span>
								<span class="font-semibold text-gray-900">
									{formatter.format(line.merchandise.price.amount * line.quantity)}
								</span>
							</div>
							<button
								onclick={() => removeItem(line.id)}
								class="mt-1 self-end text-xs text-gray-400 hover:text-red-300 hover:underline"
							>
								Remove
							</button>
						</div>
					{/each}
				{/if}
			</section>
			{#if !empty}
				<section class="ml-auto w-full lg:max-w-max">
					<div class="mt-10 flex items-center justify-end gap-4">
						<h2 class="font-light">Subtotal</h2>
						<span class="text-lg font-medium"
							>{formatter.format(cart?.cost.subtotalAmount.amount)}</span
						>
					</div>
					<span class="block text-right text-xs text-neutral-500"
						>Taxes and shipping calculated at checkout</span
					>
					<BlackButton onclick={() => (window.location = cart.checkoutUrl)} class="mt-12"
						>CHECKOUT</BlackButton
					>
				</section>
			{/if}
			<div class="mt-20 text-center">
				<h3 class="font-serif text-2xl font-light tracking-wide italic">Suggested</h3>
				<p class="font-serif text-3xl tracking-wide">You may also like</p>
				<div class="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-2">
					{#each recommended as product (product.id)}
						<div class="overflow-hidden">
							<a href="/products/{product.handle}">
								<img
									src={product.featuredImage.url}
									alt={product.featuredImage.altText}
									class="w-full transition-transform duration-300 hover:scale-105"
								/>
								<div class="px-2 text-left">
									<h1 class="mt-3 font-serif text-lg font-semibold">{product.title}</h1>
									<span class="font-light"
										>{formatter.format(product.variants.edges[0]?.node.price.amount)}</span
									>

									{#if !product.variants.edges[0]?.node.availableForSale}
										<span class="ml-6 text-sm text-red-500">Out of stock</span>
									{/if}
									<span class="block text-sm font-extralight text-neutral-500"
										>{product.variants.edges[0]?.node.title}</span
									>
								</div></a
							>
							<WhiteButton
								loading={product.loading}
								onclick={() => handleAddToCart(product)}
								disabled={!product.variants.edges[0]?.node.availableForSale || product.loading}
								class="mt-8">ADD TO CART</WhiteButton
							>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</main>
