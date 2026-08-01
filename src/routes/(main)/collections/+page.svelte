<script>
	import { slide, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount, tick } from 'svelte';
	import WhiteButton from '$lib/custom/white-button.svelte';
	import { addToCart } from '$lib/shopify.js';
	import { getCartId } from '$lib/cartStorage.js';
	import { goto } from '$app/navigation';
	import { cart } from '$lib/stores/cart.svelte';

	let { data } = $props();
	let selected = $state('');
	const collections = $derived(data.collections);

	const recommended = $state(data.recommended?.edges?.map((e) => ({ ...e.node, loading: false })));

	let contentHeight = $state(0);
	let measureElement = $state(null);

	// Measure content height to maintain consistent spacing
	$effect(async () => {
		await tick();
		if (measureElement) {
			contentHeight = measureElement.offsetHeight + 40;
		}
	});

	const formatter = new Intl.NumberFormat('en-PH', {
		style: 'currency',
		currency: 'PHP',
		minimumFractionDigits: 2
	});

	async function handleAddToCart(product) {
		product.loading = true;
		const id = product.variants.edges[0]?.node.id;
		const cartData = await addToCart(getCartId(), id);
		const quantity = cartData.data.cartLinesAdd.cart.lines.edges.reduce(
			(total, line) => total + line.node.quantity,
			0
		);
		cart.count = quantity;
		product.loading = false;
		goto('/cart');
	}

	onMount(() => {
		selected = collections[0];
	});
</script>

<main class="mt-12 mb-20 px-5 text-neutral-700">
	<div class="mx-auto 2xl:max-w-[114rem]">
		<div class="hidden gap-12 lg:flex">
			<div class="w-[40%] shrink-0">
				<h1 class="text-6xl font-light">Categories</h1>
				<ul class="mt-12">
					{#each collections as cat}
						<li class="mt-12">
							<button onclick={() => (selected = cat)}>
								<h2
									class="cursor-pointer text-6xl font-light transition-colors duration-200 {selected.title ===
									cat.title
										? 'text-neutral-700'
										: 'text-neutral-400'}"
								>
									{cat.title}
								</h2>
							</button>

							<!-- Fixed height container to prevent layout shift -->
							<div
								class="overflow-hidden"
								style="height: {selected.title === cat.title
									? contentHeight
									: 0}px; transition: height 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94);"
							>
								{#if selected.title === cat.title}
									<div bind:this={measureElement} transition:fade={{ duration: 200, delay: 50 }}>
										<p class="my-4 tracking-wide text-neutral-600">{cat.description}</p>
										<a href="/collections/{cat.handle}" class="group cursor-pointer uppercase">
											<div class="flex items-center gap-4">
												<span>SHOP {cat.title}</span>
												<img
													src="/chev-right.svg"
													alt="arrow right"
													class="mb-1 w-8 transition-[margin] group-hover:ml-3"
												/>
											</div>
										</a>
									</div>
								{/if}
							</div>
						</li>
					{/each}
				</ul>
			</div>
			<div class="grow">
				<div class="relative min-h-[1px]">
					{#key selected.handle}
						<div
							transition:fade={{ duration: 300 }}
							class="absolute inset-0 grid grid-cols-2 gap-2 sm:grid-cols-3"
						>
							{#each selected.photos as cat (cat.id)}
								<div class="aspect-[11/12] overflow-hidden">
									<img
										src={cat.image.url}
										class="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
										alt={cat.image.altText}
									/>
								</div>
							{/each}
						</div>
					{/key}
				</div>
			</div>
		</div>

		<div class="lg:hidden">
			<span class="mb-2 inline-block font-serif text-2xl italic">Shop</span>
			<h1 class="text-5xl font-light">Categories</h1>
			<ul class="mt-12">
				{#each collections as cat}
					<li class="my-4">
						<div class="flex items-center gap-6">
							<img class="w-52" src={cat.photos[0].image.url} alt={cat.photos[0].image.altText} />
							<div>
								<h2>{cat.description}</h2>
								<a class="font-semibold uppercase" href="/collections/{cat.handle}">
									<div class="mt-2 flex items-center gap-4">
										<span>SHOP {cat.title}</span>
										<img
											src="/chev-right.svg"
											alt="arrow right"
											class="mb-1 w-8 transition-[margin] group-hover:ml-3"
										/>
									</div>
								</a>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
		<div class="block">
			<div class="mt-20 text-center">
				<h3 class="font-serif text-2xl font-light tracking-wide italic">Suggested</h3>
				<p class="font-serif text-3xl tracking-wide">You may also like</p>
				<div class="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-2">
					{#each recommended as product (product.id)}
						<div class="overflow-hidden">
							<a href="/products/{product.handle}">
								<div class="aspect-[11/12] overflow-hidden">
									<img
										src={product.featuredImage.url}
										class="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
										alt={product.featuredImage.altText}
									/>
								</div>
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
