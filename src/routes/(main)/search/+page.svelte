<script>
	import { goto } from '$app/navigation';
	import ColorFilter from '$lib/custom/color-filter.svelte';
	import { clickOutside } from '$lib/util/clickOutside.js';
	import { ChevronDown, SlidersHorizontal } from 'lucide-svelte';
	import { fly } from 'svelte/transition';

	let { data } = $props();
	let products = $derived(data.products);
	let query = data.query;

	let total = $derived(products?.length || 0);

	// Color filter
	let colorsData = $derived(data.colors);
	let colors = $state([]);
	let filterShown = $state(false);
	$effect(() => {
		colors = colorsData;
	});

	// Sort
	let sortMenuOpen = $state(false);
	let sort = $state('manual');
	const sorts = [
		{ name: 'Price, low to high', key: 'price-asc' },
		{ name: 'Price, high to low', key: 'price-desc' }
	];
	function onSort(sortKey) {
		const params = new URLSearchParams(window.location.search);
		params.set('sort_by', sortKey);

		goto(`?${params.toString()}`, { replaceState: true, noscroll: true });
	}

	const formatter = new Intl.NumberFormat('en-PH', {
		style: 'currency',
		currency: 'PHP',
		minimumFractionDigits: 2
	});
</script>

<svelte:head>
	<title>Search: {total} results found “{query}”</title>
</svelte:head>

<ColorFilter open={filterShown} {colors} onClose={() => (filterShown = false)} />

<div class="px-5">
	<main class="mx-auto 2xl:max-w-[114rem]">
		<div class="flex flex-col">
			<h1 class="mt-12 font-serif text-2xl text-neutral-600 italic">Search</h1>
			<h2 class="mt-2 text-5xl tracking-wider text-neutral-800">{total} results found “{query}”</h2>
			{#if total == 0}
				<div class="h-96"></div>
			{/if}
			<div class="mt-16 mb-12 flex items-center justify-between text-neutral-800">
				<div class="flex items-center gap-2">
					<SlidersHorizontal class="w-5" />
					<button onclick={() => (filterShown = true)} class="cursor-pointer font-semibold"
						>FILTER</button
					>
				</div>
				<div class="relative flex items-center gap-6 font-light">
					<button
						class="flex cursor-pointer"
						use:clickOutside={() => {
							sortMenuOpen = false;
						}}
						onclick={() => (sortMenuOpen = !sortMenuOpen)}
					>
						<span>Sort by:</span>
						<span class="ml-2 text-neutral-500"
							>{sorts.find((s) => s.key === data.sortBy).name}</span
						>
						<ChevronDown
							class="w-5 {sortMenuOpen ? 'rotate-180' : ''} text-neutral-500 transition-transform"
						/>
					</button>
					{#if sortMenuOpen}
						<ul
							transition:fly={{ y: -10, duration: 150, opacity: 0 }}
							class="absolute top-full -right-4 mx-4 mt-2 text-left shadow-md [&_li]:px-4 [&_li]:py-2 [&_li]:text-nowrap [&_li]:text-neutral-500 [&_li]:hover:text-neutral-900 [&_li:not(:last-child)]:border-b [&_li:not(:last-child)]:border-neutral-200"
						>
							{#each sorts as sort}
								<li class="bg-white">
									<button onclick={() => onSort(sort.key)}>{sort.name}</button>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</div>

			<div class="mb-24 grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
				{#each products as product (product.id)}
					<a href="/products/{product.handle}">
						<div class="aspect-[11/12] overflow-hidden">
							{#if product.featuredImage != null}
								<img
									src={product.featuredImage.url}
									class="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
									alt={product.featuredImage.altText}
								/>
							{/if}
						</div>
						<h2 class="mt-2 text-center font-serif text-lg font-medium">{product.title}</h2>
						<p
							itemprop="offers"
							class="mt-0 text-center"
							itemscope
							itemtype="https://schema.org/Offer"
						>
							<span class="text-lg font-light" itemprop="priceCurrency" content="PHP"></span>
							<span
								class=" w-full text-center font-light"
								itemprop="price"
								content={product.variants.edges[0].node.price.amount}
								>{formatter.format(product.variants.edges[0].node.price.amount)}</span
							>
							{#if product.variants.edges[0].node.compareAtPrice != null}
								<span
									class="ml-2 text-lg font-light text-neutral-500 line-through"
									itemprop="price"
									content={product.variants.edges[0].node.compareAtPrice.amount}
									>{formatter.format(product.variants.edges[0].node.compareAtPrice.amount)}</span
								>
							{/if}
							{#if !product.variants.edges[0].node.availableForSale}
								<span class="ml-6 text-sm text-red-500">Out of stock</span>
								<link itemprop="availability" href="https://schema.org/OutOfStock" />
							{:else}
								<link itemprop="availability" href="https://schema.org/InStock" />
							{/if}
						</p>
					</a>
				{/each}
			</div>
		</div>
	</main>
</div>
