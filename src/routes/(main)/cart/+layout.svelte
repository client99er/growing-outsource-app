<script>
	let { children } = $props();
</script>

<div class="bg-gray-100">
	<div class="mx-auto 2xl:max-w-[114rem]">
		{@render children()}
	</div>
</div>
