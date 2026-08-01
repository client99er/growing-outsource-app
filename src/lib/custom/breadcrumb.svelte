<script>
	let { links } = $props();
</script>

<nav class="mt-4 flex text-sm" aria-label="Breadcrumb">
	{#each links as link, i}
		{#if i === links.length - 1}
			<span class="truncate text-nowrap text-gray-500">{link.label}</span>
		{:else}
			<a href={link.href} class="text-gray-800 hover:underline">
				{link.label}
			</a>
			<span class="mx-2">/</span>
		{/if}
	{/each}
</nav>
