<script>
	let { homeReviews } = $props();

	function randomBool() {
		return Math.random() < 0.5;
	}
</script>

{#snippet card(item, imgFirst)}
	<article class="flex flex-1 flex-col" itemScope itemType="https://schema.org/Review">
		{#if imgFirst}
			<img
				src={item.field_image.reference.image.url}
				alt={item.field_image.reference.image.altText}
				class="aspect-[3/4] w-full rounded-xl object-cover"
				itemProp="image"
				loading="lazy"
				decoding="async"
			/>
		{/if}

		<h3 class="mt-4 block font-semibold uppercase hover:underline" itemProp="itemReviewed">
			<a href={item.field_url.value} itemProp="url">{item.field_link.value}</a>
		</h3>

		<div
			class="mt-2 flex space-x-1"
			itemProp="reviewRating"
			itemScope
			itemType="https://schema.org/Rating"
		>
			{#each Array(Number(item.field_stars.value)).fill() as _, i}
				<img src="/star.png" class="h-5 w-5" alt="Star Rating" loading="lazy" decoding="async" />
			{/each}
			<meta itemProp="ratingValue" content={item.field_stars.value} />
			<meta itemProp="bestRating" content={item.field_stars.value} />
		</div>

		<p class="mt-4 font-serif text-xl text-neutral-600" itemProp="reviewBody">
			&ldquo;{item.field_review.value}&rdquo;
		</p>

		<div class="mt-auto">
			<span class="mt-4 mb-2 block" itemProp="author">{item.field_author.value}</span>
		</div>
		{#if !imgFirst}
			<img
				src={item.field_image.reference.image.url}
				alt={item.field_image.reference.image.altText}
				class="aspect-[3/4] w-full rounded-xl object-cover"
				itemProp="image"
				loading="lazy"
				decoding="async"
			/>
		{/if}
	</article>
{/snippet}
<section class="-mx-5 bg-lime-50 px-6 py-12" aria-labelledby="worth-the-hype-title">
	<h2 id="worth-the-hype-title" class="mb-4 text-5xl font-light">Worth the hype</h2>

	<ul class="grid grid-cols-2 gap-4 lg:grid-cols-3">
		{#each homeReviews as item, i (i)}
			<li class="flex flex-col">
				{@render card(item, randomBool())}
			</li>
		{/each}
	</ul>
</section>
