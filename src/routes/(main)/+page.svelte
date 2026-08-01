<script>
	import HomeFaves from '$lib/custom/home-faves.svelte';
	import ReasonsTo from '$lib/custom/reasons-to.svelte';
	import WhiteButton from '$lib/custom/white-button.svelte';
	import WorthTheHype from '$lib/custom/worth-the-hype.svelte';

	let { data } = $props();
	const homeBanner = $derived(data.homeData.banner.reference);
	const homeReviews = $derived(data.homeData.reviews.references.nodes);
	const reasonsTo = $derived(data.reasonsTo);
	const faves = $derived(data.faves.collection.products.edges.map((e) => e.node));
	const travelElevated = $derived(data.travelElevated.collection.products.edges.map((e) => e.node));
</script>

<!-- <pre class="text-xs text-wrap">{JSON.stringify(homeReviews)}</pre> -->
<main class="mt-0 mb-20 px-5 text-neutral-700">
	<div class="mx-auto 2xl:max-w-[114rem]">
		<div class="relative">
			<div class="-mx-5 flex overflow-hidden bg-red-50">
				<div class="grow-1">
					<img
						src={homeBanner.field_images.references.nodes[0]?.image.url}
						alt={homeBanner.field_images.references.nodes[0]?.image.altText}
						class="h-[720px] w-full object-cover"
					/>
				</div>
				<div class="hidden grow-1 md:block">
					<img
						alt={homeBanner.field_images.references.nodes[1]?.image.altText}
						src={homeBanner.field_images.references.nodes[1].image.url}
						class="h-[720px] w-full object-cover"
					/>
				</div>
			</div>
			<div class="absolute top-16 text-white">
				<p class="font-serif text-2xl italic">{homeBanner.field_title.value}</p>
				<h1 class="text-6xl font-light">
					{homeBanner.field_subtitle.value}
				</h1>
				<p class="font-light">{homeBanner.field_description.value}</p>
				<div class="mt-8 w-48">
					<a href={homeBanner.field_cta_link.value}>
						<WhiteButton>{homeBanner.field_cta.value}</WhiteButton>
					</a>
				</div>
			</div>
		</div>
		<HomeFaves {faves} />
		<WorthTheHype {homeReviews} />
		<HomeFaves faves={travelElevated} subText="Premium style" title="Travel elevated" />
		<ReasonsTo class="my-20" {reasonsTo} />
	</div>
</main>
