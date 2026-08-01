<script>
	let { description, features, warranty } = $props();
	let activeTab = $state('FEATURES');

	function jsonToHtml(json) {
		let html = '';

		json.children.forEach((child) => {
			if (child.type === 'list') {
				html += '<ul class="list-disc">';
				child.children.forEach((listItem) => {
					html += `<li class="mb-2">${listItem.children[0].value}</li>`;
				});
				html += '</ul>';
			} else if (child.type === 'paragraph') {
				html += '<p class="mb-4">';
				child.children.forEach((paragraphChild) => {
					if (paragraphChild.type === 'text') {
						html += paragraphChild.value;
					} else if (paragraphChild.type === 'link') {
						html += `<a class="underline" href="${paragraphChild.url}">${paragraphChild.children[0].value}</a>`;
					}
				});
				html += '</p>';
			}
		});

		return html;
	}
</script>

{#snippet tab(name)}
	<button
		onclick={() => (activeTab = name)}
		class="cursor-pointer py-3 font-medium tracking-normal {activeTab === name
			? 'border-b-2 border-neutral-700 text-neutral-700'
			: 'text-neutral-400'}">{name}</button
	>
{/snippet}
<section class="mt-10 mb-20">
	<div class="border-b border-neutral-300">
		<div class="flex space-x-12 text-center">
			<!-- {@render tab('DESCRIPTION')} -->
			{@render tab('FEATURES')}
			{@render tab('WARRANTY & RETURNS')}
		</div>
	</div>
	<div class="mt-10 w-full text-neutral-600 lg:max-w-[62%]">
		<!-- {#if activeTab === 'DESCRIPTION'}
			{@html description} -->
		{#if activeTab === 'FEATURES'}
			{@html jsonToHtml(JSON.parse(features.value))}
		{:else if activeTab === 'WARRANTY & RETURNS'}
			{@html jsonToHtml(JSON.parse(warranty.value))}
		{/if}
	</div>
</section>
