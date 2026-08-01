<script>
	import { Loader2 } from 'lucide-svelte';

	let { children, loading, class: className = '', ...rest } = $props();
</script>

<button
	class="w-full cursor-pointer border border-black bg-white py-3 text-black transition-colors duration-200 hover:bg-black hover:text-white disabled:border-none disabled:bg-gray-200 disabled:text-neutral-500 disabled:hover:bg-gray-200 {className}"
	{...rest}
>
	{#if loading}
		<div class="flex justify-center">
			<Loader2 class="animate-spin" />
		</div>
	{:else}
		{@render children()}
	{/if}
</button>
