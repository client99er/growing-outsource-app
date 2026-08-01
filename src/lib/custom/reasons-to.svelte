<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let { reasonsTo, class: className, ...rest } = $props();

	let currentImage = $state(reasonsTo?.[0].url);
</script>

<div
	class="px-5x mx-auto grid grid-cols-1 gap-12 text-neutral-700 lg:grid-cols-2 2xl:max-w-[114rem] 2xl:px-0 {className}"
>
	<div class="relative aspect-[6/5] lg:aspect-[9/8]">
		{#key currentImage}
			<img
				src={currentImage}
				alt="Gallery"
				class="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
				in:fade={{ duration: 300 }}
				out:fade={{ duration: 300 }}
			/>
		{/key}
	</div>
	<div class="flex items-center">
		<div class="w-full">
			<h2 class="mb-8 text-6xl font-light">Reasons to get Away</h2>
			<div class="grid grid-cols-2 gap-4">
				<div
					role="button"
					tabindex="0"
					onmouseenter={() => {
						currentImage = reasonsTo?.[0].url;
					}}
					class="cursor-default border border-neutral-300 px-5 py-4 transition-colors duration-200 hover:border-black"
				>
					<img src="/globe.svg" alt="globe" class="w-8" />
					<h3 class="mt-6 text-sm font-semibold uppercase">{reasonsTo?.[0]?.header}</h3>
					<p class="mt-5 text-sm">
						{reasonsTo?.[0]?.description}
					</p>
				</div>
				<div
					role="button"
					tabindex="0"
					onmouseenter={() => {
						currentImage = reasonsTo?.[1].url;
					}}
					class="cursor-default border border-neutral-300 px-5 py-4 transition-colors duration-200 hover:border-black"
				>
					<img src="/shipping.svg" alt="globe" class="w-8" />
					<h3 class="mt-6 text-sm font-semibold uppercase">{reasonsTo?.[1]?.header}</h3>
					<p class="mt-5 text-sm">
						{reasonsTo?.[1]?.description}
					</p>
				</div>
				<div
					role="button"
					tabindex="0"
					onmouseenter={() => {
						currentImage = reasonsTo?.[2].url;
					}}
					class="cursor-default border border-neutral-300 px-5 py-4 transition-colors duration-200 hover:border-black"
				>
					<img src="/experts.svg" alt="globe" class="w-8" />
					<h3 class="mt-6 text-sm font-semibold uppercase">{reasonsTo?.[2]?.header}</h3>
					<p class="mt-5 text-sm">
						{reasonsTo?.[2]?.description}
					</p>
				</div>
				<div
					role="button"
					tabindex="0"
					onmouseenter={() => {
						currentImage = reasonsTo?.[3].url;
					}}
					class="cursor-default border border-neutral-300 px-5 py-4 transition-colors duration-200 hover:border-black"
				>
					<img src="/office.svg" alt="globe" class="w-8" />
					<h3 class="mt-6 text-sm font-semibold uppercase">{reasonsTo?.[3]?.header}</h3>
					<p class="mt-5 text-sm">
						{reasonsTo?.[3]?.description}
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
