<script>
	import { goto } from '$app/navigation';
	import Breadcrumb from '$lib/custom/breadcrumb.svelte';
	import ColorFilter from '$lib/custom/color-filter.svelte';
	import ReasonsTo from '$lib/custom/reasons-to.svelte';
	import { clickOutside } from '$lib/util/clickOutside.js';
	import { ChevronDown, Filter, SlidersHorizontal } from 'lucide-svelte';
	import { fly, slide } from 'svelte/transition';

	let { data } = $props();
	const reasonsTo = $derived(data.reasonsTo);

	const collection = $derived(data.data.collection);
	const breadcrumbs = $derived.by(() => {
		const list = [
			{
				label: 'All products',
				href: `/collections`
			}
		];
		const parent = collection.metafields.find((meta) => meta?.key === 'parent_collection');

		if (parent)
			list.push({
				label: parent.reference.title,
				href: `/collections/${parent.reference.handle}`
			});

		// Now add this collection itself
		list.push({
			label: collection.title
		});
		return list;
	});

	// Sub-collections
	const subcollections = $derived.by(() => {
		const children = collection.metafields.find((meta) => meta?.key === 'child_collections');
		if (children) return children.references.edges;
		return [];
	});

	// Products
	const productSize = $derived(collection.products.edges.length);
	const products = $derived(collection.products.edges.map((e) => e.node));

	const formatter = new Intl.NumberFormat('en-PH', {
		style: 'currency',
		currency: 'PHP',
		minimumFractionDigits: 2
	});

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
		{ name: 'Featured', key: 'manual' },
		{ name: 'Best selling', key: 'best-selling' },
		{ name: 'Price, low to high', key: 'price-asc' },
		{ name: 'Price, high to low', key: 'price-desc' }
	];
	function onSort(sortKey) {
		const params = new URLSearchParams(window.location.search);
		params.set('sort_by', sortKey);

		goto(`?${params.toString()}`, { replaceState: true, noscroll: true });
	}
</script>

<svelte:head>
	<title>{collection.title}</title>
</svelte:head>
<ColorFilter open={filterShown} {colors} onClose={() => (filterShown = false)} />
<div class="px-5">
	<main class="mx-auto 2xl:max-w-[114rem]">
		<Breadcrumb links={breadcrumbs} />
		<h1 class="mt-10 text-5xl font-light md:text-6xl">{collection.title}</h1>
		<p class="mt-2 text-neutral-600">{collection.description}</p>
		<div class="w-full overflow-auto">
			<div class="mt-6 flex space-x-2 pb-3">
				{#each subcollections as sub}
					{#if sub.node.handle === collection.handle}
						<span class="block shrink-0 border bg-black px-4 py-2 font-light text-white">
							{sub.node.title}
						</span>
					{:else}
						<a href="/collections/{sub.node.handle}" class="shrink-0">
							<span class="block border px-4 py-2 font-light hover:bg-black hover:text-white">
								{sub.node.title}
							</span></a
						>
					{/if}
				{/each}
			</div>
		</div>
		<div class="mt-8 mb-12 flex items-center justify-between text-neutral-800">
			<div class="flex items-center gap-2">
				<SlidersHorizontal class="w-5" />
				<button onclick={() => (filterShown = true)} class="cursor-pointer font-semibold"
					>FILTER</button
				>
			</div>
			<div class="relative flex items-center gap-6 font-light">
				<span>{productSize} products</span>
				<button
					class="flex cursor-pointer"
					use:clickOutside={() => {
						sortMenuOpen = false;
					}}
					onclick={() => (sortMenuOpen = !sortMenuOpen)}
				>
					<span>Sort by:</span>
					<span class="ml-2 text-neutral-500">{sorts.find((s) => s.key === data.sortBy).name}</span>
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
		{#if productSize == 0}
			<p class="pt-10 text-center text-2xl font-light text-neutral-500">No product found</p>
		{/if}
		<div class="grid grid-cols-2 gap-x-2 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
			{#each products as product (product.id)}
				<a href="/products/{product.handle}">
					<div class="aspect-[11/12] overflow-hidden">
						<img
							src={product.featuredImage.url}
							class="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
							alt={product.featuredImage.altText}
						/>
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
	</main>
	<ReasonsTo class="my-36" {reasonsTo} />
</div>
