<script>
	import { theme } from '$lib/config/theme';

	let { data } = $props();
	const blogs = $derived(data.blogs);
	const newsBlogs = $derived(blogs.find((b) => b.handle === 'news'));
</script>

<svelte:head>
	<title>{theme.name} | Blogs</title>
	<meta name="description" content="Read all blog posts and updates from our store." />
</svelte:head>

{#snippet card(article)}
	<a href="/blogs/news/{article.handle}">
		{#if article.image}
			<div class="mb-4 aspect-[16/9] overflow-hidden rounded">
				<img
					src={article.image.url}
					alt={article.image.altText ?? article.title}
					class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
					loading="lazy"
				/>
			</div>
		{/if}
		<div class="flex flex-1 flex-col">
			<h2 class="mb-2 line-clamp-2 font-serif text-xl font-semibold">{article.title}</h2>

			<p class="mb-4 text-sm text-neutral-500">
				By {article.authorV2?.name} · {new Date(article.publishedAt).toLocaleDateString()}
			</p>

			<div class="prose prose-neutral line-clamp-3 flex-1">
				{@html article.contentHtml}
			</div>

			<button
				class="text-primary mt-4 inline-block cursor-pointer self-start font-medium hover:underline"
			>
				Read more →
			</button>
		</div>
	</a>
{/snippet}

<main class="mt-12 mb-20 px-5 text-neutral-700">
	<div class="mx-auto 2xl:max-w-[114rem]">
		{#if newsBlogs?.articles?.edges.length > 0}
			<div class="grid grid-cols-2 gap-4 md:grid-cols-3">
				{#each newsBlogs.articles.edges as { node: article }, i (article.id)}
					<div class={i === 0 ? 'md:col-span-2' : ''}>
						{@render card(article)}
					</div>
				{/each}
			</div>
		{:else}
			<p class="text-center text-lg text-gray-500">No blogs found.</p>
		{/if}
	</div>
</main>
