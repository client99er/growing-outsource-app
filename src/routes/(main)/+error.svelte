<script>
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.error.title}</title>
</svelte:head>
<div class="px-5">
	<main class="mx-auto 2xl:max-w-[114rem]">
		<p class="mt-44 text-center font-serif text-3xl tracking-wide text-neutral-800">
			{page.error.message}
		</p>
		<p class="my-10 text-center text-xl tracking-wide text-neutral-600">
			Head back to our homepage below
		</p>
		<a href="/" class="mb-72 block">
			<div class="flex items-center justify-center gap-2 font-semibold">
				<span>BACK TO HOME PAGE</span>
				<img src="/chev-right.svg" alt="right arrow" class="size-6" />
			</div>
		</a>
	</main>
</div>
