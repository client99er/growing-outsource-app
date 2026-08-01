<script>
	let { data } = $props();
	let { policy } = data;
</script>

<svelte:head>
	<title>{policy.title}</title>
</svelte:head>

<main class="mt-12 mb-20 px-5 text-neutral-700">
	<div class="mx-auto 2xl:max-w-[114rem]">
		<div
			class="mx-auto w-2xl font-light [&_a]:text-blue-500 [&_a]:underline [&_h2]:my-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_li]:mb-2 [&_p]:mb-4 [&_strong]:font-semibold"
		>
			<h1 class="mb-10 text-center text-4xl font-normal">Privacy Policy</h1>

			{@html policy.body}
		</div>
	</div>
</main>
