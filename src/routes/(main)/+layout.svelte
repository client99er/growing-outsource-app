<script>
	import { Search, User, ShoppingCart } from 'lucide-svelte';
	import AnnouncementBar from '$lib/custom/announcement-bar.svelte';
	import Footer from '$lib/custom/footer.svelte';
	import { onMount } from 'svelte';
	import { getCart } from '$lib/shopify.js';
	import { getCartId } from '$lib/cartStorage.js';
	import { cart } from '$lib/stores/cart.svelte';
	import { theme } from '$lib/config/theme';
	import MobileNav from '$lib/custom/mobile-nav.svelte';
	import SearchBar from '$lib/custom/search-bar.svelte';

	let { data, children } = $props();

	onMount(async () => {
		// Compute total qty for display and update state
		const quantity = data.cartData.data.cart?.lines?.edges?.reduce(
			(total, line) => total + line.node.quantity,
			0
		);
		cart.count = quantity;
	});

	function extractHandle(url) {
		// e.g. "/collections/my-collection" => "my-collection"
		return `/collections/${url?.split('/').pop()}`;
	}

	let isSearchOpen = $state(false);
</script>

<AnnouncementBar announcements={data.shop.value} />
<MobileNav menu={data.menu} flipFlag={(value) => (isSearchOpen = value)} {isSearchOpen} />
<header class="px-5">
	<nav
		class="mx-auto hidden items-center justify-between py-4 tracking-wide lg:flex 2xl:max-w-[114rem]"
	>
		<a href="/" class="shrink-0">
			<img src={theme.logoPath} alt="logo" class="w-[140px]" />
		</a>
		<ul class="z-20 flex items-center space-x-8 font-medium" role="list">
			{#each data.menu as item}
				<li class="group relative pb-1">
					{#if item.title.toLowerCase().includes('sale')}
						<a href={item.url} class="text-red-500">{item.title}</a>
					{:else}
						<a href={extractHandle(item.url)}>{item.title}</a>
					{/if}
					<span
						class="absolute bottom-0 left-1/2 h-[1px] w-0 bg-black transition-all duration-300 group-hover:left-0 group-hover:w-full"
					></span>

					{#if item.items?.length}
						<div
							class="scale-95x pointer-events-none absolute left-0 -translate-y-3 bg-white px-6 py-6 opacity-0 shadow-lg transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100"
						>
							<ul class="flex flex-col gap-y-3">
								{#each item.items as subitem}
									<li>
										<a
											class="font-light text-nowrap hover:underline"
											href={extractHandle(subitem.url)}>{subitem.title}</a
										>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
		<div class="flex items-center space-x-4">
			<Search
				id="search-icon"
				onclick={() => {
					isSearchOpen = !isSearchOpen;
				}}
				class="cursor-pointer transition-transform hover:scale-110"
			/>
			<a href={theme.accountsUrl}>
				<User class="cursor-pointer transition-transform hover:scale-110" />
			</a>
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
	</nav>
	<SearchBar {isSearchOpen} onDimClick={() => (isSearchOpen = false)}></SearchBar>
</header>
{@render children()}
<Footer />
