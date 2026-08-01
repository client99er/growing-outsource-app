<script>
	import { theme } from '$lib/config/theme.js';
	import ReasonsTo from '$lib/custom/reasons-to.svelte';

	let { data } = $props();

	const store = $derived(data.store);
	const reasonsTo = $derived(data.reasonsTo);
</script>

<svelte:head>
	<title>{store.name}</title>
</svelte:head>

<main class="mt-12 mb-20 px-5 text-neutral-700">
	<div class="mx-auto 2xl:max-w-[114rem]">
		<h1 class="mt-12 mb-2 text-center text-6xl font-light text-neutral-900">{store.name}</h1>
		<p class="mb-20 px-6 text-center font-light md:px-10 lg:px-56">
			{store.name}, come shop our lineup IRL! Our stores are also available for call and collect
			orders and courier services. To arrange for call and collect, please give us a call at
			<a href="tel:{theme.telephone}" class="underline">{theme.telephone}</a> during our business
			hours, or drop us a note at
			<a href="mailto:{theme.email}" class="underline">{theme.email}</a>.
		</p>
		<div class="h-20 w-full bg-gray-50"></div>
		<img src={store.image} alt="" class="h-[500px] w-full bg-red-100 object-cover" />
		<div class="flex flex-col md:flex-row">
			<div class="min-h-96 flex-1">
				<iframe
					title="map"
					class="h-full min-h-96 w-full"
					src={store.map}
					style="border:0;"
					allowfullscreen=""
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
			<div class="flex h-96 min-h-96 flex-1 items-center justify-center bg-black text-white">
				<div class="text-center">
					<h2 class="mb-2 text-5xl font-light">Location</h2>
					<p class="font-light">{store.address}</p>
				</div>
			</div>
		</div>
		<div class="mt-4">
			<ReasonsTo class="mx-20" {reasonsTo} />
		</div>
	</div>
</main>
