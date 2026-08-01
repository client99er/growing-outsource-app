<script>
	import { theme } from '$lib/config/theme';
</script>

{#snippet category(name, img)}
	<a href="/" class="group w-full">
		<div
			class="flex items-center justify-between gap-4 rounded-md bg-white p-4 text-sm shadow-lg transition-colors duration-300 group-hover:bg-black group-hover:text-white"
		>
			<img src={theme.logoPath} alt="collection" class="w-16 object-contain" />
			<span>SHOP {name}</span>
			<img src="/chev-right.svg" alt="right arrow" class="w-10 group-hover:invert" />
		</div></a
	>
{/snippet}

<div class="mb-36 text-center">
	<h3 class="my-6 font-serif text-3xl">Your cart is empty</h3>
	<p class="text-xl font-light tracking-wide">Let's change that!</p>
	<div class="mx-auto mt-16 flex max-w-max flex-col items-center justify-center gap-6 lg:flex-row">
		{@render category('LUGGAGE')}
		{@render category('BAGS')}
		{@render category('ACCESSORIES')}
	</div>
</div>
