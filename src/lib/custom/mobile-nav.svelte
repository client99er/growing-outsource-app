<script>
	import { ChevronDown, Hamburger, Menu, Search, ShoppingCart, X } from 'lucide-svelte';
	import { theme } from '$lib/config/theme';
	import { cart } from '$lib/stores/cart.svelte';
	import { slide } from 'svelte/transition';
	import { afterNavigate } from '$app/navigation';

	let { menu, flipFlag, isSearchOpen } = $props();
	let open = $state(false);
	let openItem = $state(null);

	function extractHandle(url) {
		// e.g. "/collections/my-collection" => "my-collection"
		return `/collections/${url?.split('/').pop()}`;
	}

	afterNavigate(() => {
		open = false;
	});
</script>

{#if open}
	<button
		aria-label="backdrop"
		class="fixed inset-0 z-40 bg-black/30"
		onclick={() => (open = false)}
		tabindex="0"
	></button>
{/if}

<header class="relative lg:hidden">
	<div class="flex items-center justify-between px-5 py-5">
		<button
			onclick={() => {
				open = !open;
			}}
			class="cursor-pointer"
		>
			{#if open}
				<X />
			{:else}
				<Menu />
			{/if}
		</button>
		<a href="/" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
			<img src={theme.logoPath} alt="logo" class="w-[110px]" />
		</a>
		<div class="flex items-center space-x-2">
			{#if isSearchOpen}
				<X
					id="search-icon"
					onclick={() => {
						flipFlag(false);
					}}
					class="cursor-pointer transition-transform hover:scale-110"
				/>
			{:else}
				<Search
					id="search-icon"
					onclick={() => {
						flipFlag(true);
					}}
					class="cursor-pointer transition-transform hover:scale-110"
				/>
			{/if}

			<a href="/cart">
				<div class="relative">
					<ShoppingCart class="cursor-pointer transition-transform hover:scale-110" />
					<span
						class="absolute -top-3 -right-4 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white"
						>{cart.count}</span
					>
				</div></a
			>
		</div>
	</div>
</header>

<nav
	class="fixed top-0 {open
		? 'translate-x-0'
		: '-translate-x-full'} left-0 z-50 h-full w-72 bg-white px-2 py-8 shadow-lg transition-transform duration-300 ease-in-out"
>
	<a href="/" class="flex justify-center">
		<img src={theme.logoPath} alt="logo" class="w-[110px]" />
	</a>
	<ul class="mt-12">
		{#each menu as item}
			<li class="my-6">
				<button
					tabindex="0"
					onclick={() => {
						if (openItem === item.title) openItem = null;
						else openItem = item.title;
					}}
					class="flex w-full items-center justify-between"
				>
					{#if item?.items?.length == 0}
						<a href={extractHandle(item.url)}>{item.title}</a>
					{:else}
						<h3>{item.title}</h3>
					{/if}
					{#if item?.items?.length > 0}
						<ChevronDown
							class="{openItem === item.title ? 'rotate-180' : ''} transition-transform"
						/>
					{:else}
						<span></span>
					{/if}
				</button>
				{#if openItem === item.title}
					<ul class="mt-4 ml-4 flex flex-col gap-y-3" transition:slide>
						{#each item.items as subitem}
							<li>
								<a class="font-light text-nowrap hover:underline" href={extractHandle(subitem.url)}
									>{subitem.title}</a
								>
							</li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	</ul>
	<hr class="text-neutral-200" />
	<a href={theme.accountsUrl} class="my-4 block text-neutral-600">Account</a>
</nav>
