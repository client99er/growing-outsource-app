<script>
	let { children, class: className = '', ...rest } = $props();
</script>

<button
	class="w-full cursor-pointer border border-black bg-black py-3 text-white transition-colors duration-200 hover:bg-white hover:text-black disabled:border-none disabled:bg-gray-400 disabled:hover:text-white {className}"
	{...rest}>{@render children()}</button
>
