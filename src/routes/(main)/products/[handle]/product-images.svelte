<script>
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import mediumZoom from 'medium-zoom';
	import { onMount } from 'svelte';

	// onReady: When this component is ready, you can call exposed scrollToColor
	let { selectableImages, onReady } = $props();
	let zoomMobileEl;
	let zoomDesktopEl;

	// Listen for color selection from parent
	export function scrollToColor(color) {
		// Try to find the index of the image with altText matching color
		const idx = selectableImages.findIndex(
			(img) => (img.altText || '').toLowerCase() === color.toLowerCase()
		);

		if (idx === -1) return;
		// Activate the correct slide in both swipers if present
		if (zoomMobileEl && zoomDesktopEl) {
			zoomDesktopEl.swiper.slideTo(idx);
			zoomMobileEl.swiper.slideTo(idx);
		}
	}

	onMount(async () => {
		const zoom = mediumZoom('[data-zoomable]');
		const swiper = await import('swiper/element/bundle');
		swiper.register();
		onReady();
	});
</script>

<div class="relative h-full overflow-hidden lg:max-w-[62%] lg:min-w-[62%]">
	<!-- Thumb Mobile + Tablet View -->
	<div class="mb-1 lg:hidden">
		<swiper-container
			class="thumbs-mobile h-16 w-full"
			slides-per-view="auto"
			direction="horizontal"
			space-between="5"
			css-mode="true"
		>
			{#each selectableImages as image}
				<swiper-slide class="w-auto">
					<img src={image.url} class="h-16 w-16 object-cover" alt={image.altText} />
				</swiper-slide>
			{/each}
		</swiper-container>
	</div>
	<!-- Thumb Tablet + Desktop View -->
	<div class="absolute top-10 bottom-0 z-10 ml-2 hidden lg:ml-10 lg:block">
		<swiper-container
			class="thumbs-desktop h-[400px]"
			slides-per-view="6"
			direction="vertical"
			space-between="5"
			css-mode="true"
		>
			{#each selectableImages as image}
				<swiper-slide>
					<img src={image.url} class="h-16 w-16 object-cover" alt={image.altText} />
				</swiper-slide>
			{/each}
		</swiper-container>
	</div>
	<button id="prev">
		<ChevronLeft
			class="ml-16 hidden h-10 w-10 bg-white text-slate-500 opacity-80 lg:ml-32 lg:block"
		/>
	</button>
	<button id="next">
		<ChevronRight class="hidden h-10 w-10 bg-white text-slate-500 opacity-80 lg:block" />
	</button>
	<!-- Zoomable Mobile View -->
	<swiper-container
		class="lg:hidden"
		navigation-prev-el="#prev"
		navigation-next-el="#next"
		slides-per-view="1"
		bind:this={zoomMobileEl}
		thumbs-swiper=".thumbs-mobile"
	>
		{#each selectableImages as image}
			<swiper-slide>
				<img
					src={image.url}
					data-zoomable
					class="z-10 h-full w-full object-cover"
					alt={image.altText}
				/>
			</swiper-slide>
		{/each}
	</swiper-container>
	<!-- Zoomable Tablet + Desktop View -->
	<swiper-container
		class="hidden lg:block"
		navigation-prev-el="#prev"
		navigation-next-el="#next"
		slides-per-view="1"
		loop="true"
		bind:this={zoomDesktopEl}
		thumbs-swiper=".thumbs-desktop"
	>
		{#each selectableImages as image}
			<swiper-slide>
				<img
					src={image.url}
					data-zoomable
					class="z-10 h-full w-full object-cover"
					alt={image.altText}
				/>
			</swiper-slide>
		{/each}
	</swiper-container>
</div>

<style>
	#prev,
	#next {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 10;
	}

	#prev {
		left: 10px;
	}

	#next {
		right: 10px;
	}
</style>
