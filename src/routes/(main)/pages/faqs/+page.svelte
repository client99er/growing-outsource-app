<script>
	import { theme } from '$lib/config/theme';
	import { MessageSquare, Mail } from 'lucide-svelte';

	let { data } = $props();
	const questionsAndAnswers = $derived.by(() => {
		return data.items.metafield.references.edges.map((edge) => {
			return {
				section: edge.node.section_field.value,
				items: edge.node.section_items.references.edges.map((itemEdge) => itemEdge.node)
			};
		});
	});
</script>

<svelte:head>
	<title>FAQs | {theme.name}</title>
</svelte:head>

{#snippet section(title, items = [])}
	<section class="mb-8 max-w-96">
		<h3 class="mb-4 font-serif text-2xl text-neutral-900">{title}</h3>
		{#each items as item}
			<details class="mb-4">
				<summary class="cursor-pointer list-none font-light underline"
					>{item.question_field.value}</summary
				>
				<p class="mt-2 text-sm">{item.answer_field.value}</p>
			</details>
		{/each}
	</section>
{/snippet}

{#snippet contactUs()}
	<h5 class="text-center font-serif text-xl tracking-wider md:text-left">Contact us</h5>
	<div class="mt-4 flex items-center">
		<MessageSquare strokeWidth="1" class="mt-1 mr-4 h-7 w-7 text-neutral-600" />
		<div class="flex flex-col text-sm text-neutral-700">
			<div>
				<a href={theme.chatLink} class="font-serif text-lg underline" target="_blank">Chat</a>
			</div>
			<span class="font-light">Chat with us 10AM - 8PM</span>
		</div>
	</div>
	<div class="mt-2 flex items-center">
		<Mail strokeWidth="1" class="mt-1 mr-4 text-neutral-600 md:h-10 md:w-10" />
		<div class="flex flex-col text-sm text-neutral-700">
			<div>
				<a class="font-serif text-lg underline" href="mailto:{theme.email}">Email</a>
			</div>
			<span class="font-light">We'll get back to you within 1-2 days</span>
		</div>
	</div>
{/snippet}

<main class="mt-0 mb-20 px-5 text-neutral-700">
	<div class="mx-auto 2xl:max-w-[114rem]">
		<div class="-mx-5 bg-lime-50 py-10 text-center">
			<h1 class="font-serif text-lg">FAQs</h1>
			<h2 class="text-5xl font-light tracking-wider">How can we help you?</h2>
		</div>
		<div class="mt-12 flex items-start justify-center">
			<aside class="mr-12 hidden w-56 shrink-0 bg-gray-50 px-6 py-4 md:block">
				{@render contactUs()}
			</aside>
			<div class="w-full px-8 md:w-auto md:min-w-lg md:border-l md:border-neutral-300 lg:min-w-xl">
				{#each questionsAndAnswers as i}
					{@render section(i.section, i.items)}
				{/each}
			</div>
		</div>
		<aside class="mt-8 w-full bg-gray-50 px-6 py-4 md:hidden">
			{@render contactUs()}
		</aside>
	</div>
</main>
