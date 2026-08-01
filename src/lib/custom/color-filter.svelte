<script>
	import { X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { colorMap } from '$lib/util/colors';
	import { goto } from '$app/navigation';
	import WhiteButton from './white-button.svelte';
	import BlackButton from './black-button.svelte';

	let { open = false, onClose, colors = [] } = $props();

	const colorArray = Object.entries(colorMap).map(([name, hex]) => ({
		name,
		hex
	}));

	function onColorSelect(color) {
		if (!colors) colors = [];

		if (colors.includes(color)) {
			colors = colors.filter((c) => c !== color);
		} else {
			colors = [...colors, color];
		}
	}

	async function apply() {
		const params = new URLSearchParams(window.location.search);
		if (colors.length > 0) {
			params.set('colors', colors.join(','));
		} else {
			params.delete('colors');
		}

		goto(`?${params.toString()}`, { replaceState: true, noscroll: true });
		onClose();
	}
</script>

{#if open}
	<button
		transition:fade
		aria-label="backdrop"
		class="fixed inset-0 z-40 bg-black/30"
		onclick={onClose}
		tabindex="0"
	></button>
{/if}

<nav
	class="fixed top-0 {open
		? 'translate-x-0'
		: 'translate-x-full'}  right-0 z-50 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out md:w-[500px]"
>
	<div class="flex h-screen flex-col">
		<div class="flex justify-end border-b border-neutral-200 px-2 py-2">
			<button class="cursor-pointer" onclick={onClose}
				><X strokeWidth="1" class="size-10 text-neutral-700" /></button
			>
		</div>
		<div class="px-10 py-10">
			<h3 class="mb-6">COLOR</h3>
			<div class="grid grid-cols-3 gap-2">
				{#each colorArray as color}
					<button
						onclick={() => onColorSelect(color.name)}
						class="flex aspect-square cursor-pointer flex-col items-center justify-center border px-2 {colors?.includes(
							color.name
						)
							? 'border-neutral-900'
							: 'border-neutral-200'} text-sm transition-colors hover:bg-amber-50"
					>
						<div
							class="mb-2 size-6 rounded-full border border-neutral-100"
							style="background: {color.hex}"
						></div>
						<span class="text-xs md:text-sm">{color.name}</span>
					</button>
				{/each}
			</div>
		</div>
		<div class="mt-auto flex gap-4 border-t border-neutral-200 px-10 py-4">
			<WhiteButton onclick={() => (colors = [])}>RESET</WhiteButton>
			<BlackButton onclick={apply}>APPLY</BlackButton>
		</div>
	</div>
</nav>
