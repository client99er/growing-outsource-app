<script>
	// TODO: Now do all images lol
	// TODO: Do the details page too
	import { theme } from '$lib/config/theme';
	// These stores must be non-flagship
	const stores = $derived(theme.stores.filter((store) => !store.flagship) || []);

	const flagship = $derived(theme.stores.find((store) => store.flagship) || stores[0]);
</script>

<svelte:head>
	<title>Our Stores | {theme.name}</title>
</svelte:head>

{#snippet storeCard(store)}
	<div>
		<a href="/pages/store{store.link}" class="relative block">
			<img
				src={store.image}
				alt={store.name}
				class="h-56 w-full object-cover object-bottom brightness-[40%]"
			/>
			<span
				class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-gray-200 hover:text-white"
				>{store.name.split('-')[1] || 'Store'}</span
			>
		</a>
		<h2 class="mt-2 mb-1 text-xl text-neutral-700">{store.name}</h2>
		<a href="/pages/store{store.link}">
			<div class="flex items-center space-x-2 text-sm font-semibold">
				<span>DETAILS</span>
				<img src="/chev-right.svg" alt="Submit" class="w-6" />
			</div>
		</a>
	</div>
{/snippet}

<!-- MAIN OR FLAGSHIP STORE -->
<main class="mt-12 mb-20 px-5 text-neutral-700">
	<div class="mx-auto 2xl:max-w-[114rem]">
		<h1 class="mb-16 text-center text-6xl font-light text-neutral-900">Visit us IRL</h1>

		<div class="flagship">
			<div class="flex flex-col bg-gray-50 md:flex-row">
				<a href="/pages/store{flagship.link}" class="relative block flex-1">
					<img
						src={flagship.image}
						alt={flagship.name}
						class="h-96 w-full object-cover object-bottom brightness-[40%]"
					/>
					<span
						class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-gray-200 hover:text-white"
						>{flagship.name.split('-')[1] || 'Store'}</span
					>
				</a>
				<div class="flex flex-1 flex-col justify-center px-0 text-xl md:px-12">
					<h2 class="mb-4 font-serif text-xl italic">Visit our flagship store:</h2>
					<h2 class="mb-4 text-2xl">{flagship.name}</h2>
					<h2 class="mb-4 font-light">{flagship.address}</h2>

					<a href="/pages/store{flagship.link}">
						<div class="flex items-center space-x-2 text-base font-semibold">
							<span>DETAILS</span>
							<img src="/chev-right.svg" alt="Submit" class="w-8" />
						</div>
					</a>
				</div>
			</div>
		</div>

		<!-- NON-FLAGSHIP STORES -->
		<h2 class="mt-12 mb-2 font-serif text-lg font-semibold italic">All Stores:</h2>
		<div class="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
			{#each stores as store}
				{@render storeCard(store)}
			{/each}
		</div>
	</div>
</main>
