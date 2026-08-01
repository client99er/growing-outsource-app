<script>
	import { clickOutside } from '$lib/util/clickOutside';
	import { Search, X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	let { isSearchOpen, onDimClick } = $props();
	let query = $state('');

	$effect(() => {
		if (isSearchOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});
</script>

{#if isSearchOpen}
	<div
		class="absolute top-20 right-0 bottom-0 left-0 h-full w-full"
		use:clickOutside={(event) => {
			if (event.target.id !== 'search-icon') {
				onDimClick();
			}
		}}
	>
		<button onclick={() => onDimClick()} aria-label="Close search">
			<div
				in:fade={{ duration: 150 }}
				out:fade={{ duration: 150 }}
				class="absolute top-2 right-0 bottom-0 left-0 z-10 w-full bg-black opacity-10"
			></div>
		</button>
		<div
			in:fade={{ duration: 150 }}
			out:fade={{ duration: 150 }}
			class="absolute top-2 right-0 left-0 z-20 w-full bg-white"
		>
			<div class="flex items-center space-x-4 px-5 pt-6 pb-20 lg:px-12">
				<div class="flex grow items-center space-x-0 border-b border-neutral-400 lg:space-x-4">
					<div class="pt-0">
						<Search size={25} class="text-neutral-500" strokeWidth={1} />
					</div>
					<input
						type="text"
						bind:value={query}
						onkeydown={(e) => {
							if (e.key === 'Enter' && query.trim().length) {
								window.location.href = `/search?query=${encodeURIComponent(query.trim())}`;
							}
						}}
						class="w-full border-none py-6 text-xl font-light tracking-wider text-neutral-700 outline-none placeholder:text-neutral-400 focus:ring-0 focus:outline-none lg:text-4xl"
						placeholder="Type what you are looking for..."
					/>
					{#if query}
						<button onclick={() => (query = '')} class="cursor-pointer pt-0 underline">CLEAR</button
						>
					{/if}
				</div>
				<button
					onclick={() => onDimClick()}
					aria-label="Close search"
					class="hidden cursor-pointer lg:block"
				>
					<X size={40} class="text-neutral-700" strokeWidth={1} />
				</button>
			</div>
		</div>
	</div>
{/if}
