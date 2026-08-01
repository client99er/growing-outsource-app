<script>
	import { invalidate } from '$app/navigation';
	import { getCartId } from '$lib/cartStorage';
	import { updateCartItemMutation } from '$lib/queries/cartQueries';
	import { shopifyFetch } from '$lib/shopify';
	import { Loader, Minus, Plus } from 'lucide-svelte';

	let { lineId, quantity = 1 } = $props();

	let loading = $state(false);
	async function updateQuantity(newQty) {
		if (newQty < 1) return; // Prevent 0 or negative

		loading = true;

		const cartId = getCartId();
		await shopifyFetch(updateCartItemMutation, fetch, {
			cartId,
			lines: [{ id: lineId, quantity: newQty }]
		});

		// Refresh cart
		invalidate('app:cart');
		loading = false;
	}
</script>

<div class="flex items-center justify-center">
	{#if loading}
		<Loader class="animate-spin" />
	{:else}
		<div class="flex gap-4 rounded border border-neutral-300 bg-white px-1 py-px text-neutral-600">
			<button onclick={() => updateQuantity(quantity - 1)} class="cursor-pointer"
				><Minus class="w-5" /></button
			>
			<span>{quantity}</span>
			<button onclick={() => updateQuantity(quantity + 1)} class="cursor-pointer"
				><Plus class="w-5" /></button
			>
		</div>
	{/if}
</div>
