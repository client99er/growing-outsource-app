<script>
	let { faves, subText = 'A few of our', title = 'Favorites' } = $props();

	const formatter = new Intl.NumberFormat('en-PH', {
		style: 'currency',
		currency: 'PHP',
		minimumFractionDigits: 2
	});
</script>

<div class="block">
	<div class="mt-10 mb-8 text-center">
		<h3 class="font-serif text-2xl font-light tracking-wide italic">{subText}</h3>
		<p class="font-serif text-3xl tracking-wide">{title}</p>
		<div class="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-2">
			{#each faves as product (product.id)}
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
				</div>
			{/each}
		</div>
	</div>
</div>
