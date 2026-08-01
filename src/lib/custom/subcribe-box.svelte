<script>
	import { ChevronsRight } from 'lucide-svelte';

	let { name } = $props();
</script>

<div>
	<h3 class="text-4xl font-light">Stay in the know</h3>
	<p class="my-4">
		We'll send you updates on our latest launches and more. <br />
		Need to take off? Unsubscribe any time.
	</p>
	<form action="/">
		<div class="flex w-full items-center border bg-white">
			<input
				type="email"
				class="w-full border-none py-3 pl-4 outline-none focus:ring-0 focus:outline-none"
				placeholder="Email address"
				required
			/>
			<button type="submit" class="cursor-pointer px-4 hover:scale-110">
				<img src="/chev-right.svg" alt="Submit" class="w-12" />
			</button>
		</div>
	</form>
	<div class="mt-4 text-xs [&_a]:underline">
		<span
			>By clicking submit, you agree to our <a href="/pages/privacy-policy">Privacy Policy</a> and
			<a href="/pages/terms">Terms</a>.</span
		>
		<br />
		<span>We'll keep you updated with the latest from {name}.</span>
	</div>
</div>
