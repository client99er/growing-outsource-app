<script>
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';

	let { announcements } = $props();
	let parsedAnnouncements = $derived(JSON.parse(announcements).announcements || []);
	// todo: implement textColor
	// For the carousel
	let track; // The carousel track element
	let nextBtn; // The next button element
	let prevBtn; // The previous button element
	let isTransitioning = false; // 🔒 prevents overlapping transitions
	let currentIndex = $state(1);
	const color = $derived.by(() => {
		// The actual announcements start at index 1 (after the first clone)
		// and end at length - 2 (before the last clone)
		const realIndex = Math.max(0, Math.min(currentIndex - 1, parsedAnnouncements.length - 1));
		return parsedAnnouncements.length > 0
			? (parsedAnnouncements[realIndex].style?.backgroundColor ?? 'black')
			: 'black';
	});

	onMount(() => {
		let items = Array.from(track.children);
		const firstClone = items[0].cloneNode(true);
		const lastClone = items[items.length - 1].cloneNode(true);
		firstClone.id = 'first-clone';
		lastClone.id = 'last-clone';
		track.appendChild(firstClone);
		track.insertBefore(lastClone, track.firstChild);
		items = Array.from(track.children);

		let slideWidth = items[0].clientWidth;
		track.style.transform = `translateX(${-slideWidth * currentIndex}px)`;

		function updateSlideWidth() {
			items = Array.from(track.children);
			slideWidth = items[0].clientWidth;
			track.style.transition = 'none';
			track.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
		}
		const resizeListener = () => updateSlideWidth();
		window.addEventListener('resize', resizeListener);

		function goToNextSlide() {
			if (isTransitioning || currentIndex >= items.length - 1) return;
			isTransitioning = true;
			currentIndex++;
			track.style.transition = 'transform 0.3s ease-in-out';
			track.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
		}

		function goToPrevSlide() {
			if (isTransitioning || currentIndex <= 0) return;
			isTransitioning = true;
			currentIndex--;
			track.style.transition = 'transform 0.3s ease-in-out';
			track.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
		}

		nextBtn.addEventListener('click', goToNextSlide);
		prevBtn.addEventListener('click', goToPrevSlide);

		const transitionEndHandler = () => {
			if (items[currentIndex].id === 'first-clone') {
				track.style.transition = 'none';
				currentIndex = 1;
				track.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
			} else if (items[currentIndex].id === 'last-clone') {
				track.style.transition = 'none';
				currentIndex = items.length - 2;
				track.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
			}
			isTransitioning = false; // ✅ unlock
		};
		track.addEventListener('transitionend', transitionEndHandler);

		const autoSlideInterval = setInterval(() => {
			goToNextSlide();
		}, 4000);

		onDestroy(() => {
			window.removeEventListener('resize', resizeListener);
			track.removeEventListener('transitionend', transitionEndHandler);
			clearInterval(autoSlideInterval);
		});
	});
</script>

<div style="background-color: {color}" class="transition-colors duration-200 ease-in-out">
	<div class="relative mx-auto w-full overflow-hidden py-3 text-xs lg:w-5xl lg:py-2">
		<div class=" flex text-white transition-transform duration-300 ease-in-out" bind:this={track}>
			{#each parsedAnnouncements as a (a.title)}
				<div class="carousel-item flex min-w-full items-center justify-center lg:min-w-5xl">
					{#if a.type === 'link'}
						<a href={a.link} class="underline">
							{a.title}
						</a>
					{:else}
						{a.title}
					{/if}
				</div>
			{/each}
		</div>
		<div
			class="pointer-events-none absolute top-1/2 flex w-full -translate-y-1/2 justify-between px-4"
		>
			<span bind:this={prevBtn} class="pointer-events-auto">
				<ChevronLeft class="cursor-pointer text-white" />
			</span>
			<span bind:this={nextBtn} class="pointer-events-auto">
				<ChevronRight class="cursor-pointer text-white" />
			</span>
		</div>
	</div>
</div>
