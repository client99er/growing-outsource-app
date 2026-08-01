<script>
	let { data } = $props();
	const blog = $derived(data?.blog);
</script>

<svelte:head>
	<title>{blog.title}</title>
</svelte:head>

<main class="mt-12 mb-20 px-5 text-neutral-700">
	<div class="mx-auto 2xl:max-w-[114rem]">
		{#if blog.image}
			<img
				src={blog.image.url}
				alt={blog.image.altText ?? blog.title}
				class="mb-6 aspect-[16/9] w-full object-cover"
			/>
		{/if}
		<article>
			<h1 class="mb-4 text-center font-serif text-5xl">{blog.title}</h1>

			<p class="mb-6 text-center text-sm text-gray-500">
				By {blog.authorV2?.name} •
				{new Date(blog.publishedAt).toLocaleDateString(undefined, {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				})}
			</p>

			<div class="prose prose-lg mx-auto [&_h2]:font-serif">
				{@html blog.contentHtml}
			</div>
			<div class="text-center">
				<a href="/blogs" class="mt-10 block">
					<div class="flex items-center justify-center gap-2 font-semibold">
						<img src="/chev-right.svg" alt="left arrow" class="size-6 rotate-180" />
						<span>BACK TO BLOGS</span>
					</div>
				</a>
			</div>
		</article>
	</div>
</main>
