<script>
	import { theme } from '$lib/config/theme.js';
	import BlackButton from '$lib/custom/black-button.svelte';
	import { Mail, MessageSquare } from 'lucide-svelte';

	let showSuccess = $state(false);
	let { form } = $props();
</script>

<svelte:head>
	<title>Contact Us</title>
</svelte:head>

<main class="mb-20 px-5 text-neutral-700">
	<div class="mx-auto 2xl:max-w-[114rem]">
		<div class="flex flex-col bg-gray-50 md:flex-row">
			<div
				style="background-image: url('/contact-us.jpg'); background-position: top center;"
				class="flex-1 bg-cover"
			></div>
			<div
				class="flex flex-1 flex-col justify-center bg-black pt-20 pb-20 text-center text-white md:w-1/2"
			>
				<div>
					<h1 class="text-5xl font-light">Contact Us</h1>
					<p class="py-5 font-light tracking-wider">
						Looking for help? Let us know—we're here for you.
					</p>

					<div class="mt-8 flex justify-around">
						<div class="">
							<a href={theme.chatLink} class="font-serif text-lg underline" target="_blank">
								<div
									class="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-lime-50 font-extralight"
								>
									<MessageSquare strokeWidth="1" class="h-10 w-10 text-neutral-600" />
								</div>
								<span class="font-sans text-sm font-extralight">Chat with us 10AM - 8PM</span>
							</a>
						</div>
						<div class="">
							<a class="font-serif text-lg underline" href="mailto:{theme.email}">
								<div
									class="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-lime-50"
								>
									<Mail strokeWidth="1" class="h-10 w-10 text-neutral-600" />
								</div>
								<span class="font-sans text-sm font-light"
									>We'll get back to you within 1-2 days</span
								>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-16 text-center">
			<h2 class="text-5xl font-light">Get in touch</h2>
			<p class="mx-auto mt-4 max-w-2xl leading-loose">
				We typically respond in 1-2 business days. Already submitted a chat, form, or email? Please
				hold tight— we respond to messages in the order that they are received and we'll be with you
				as soon as possible.
			</p>
			{#if form?.success}
				<div
					class="mx-auto mt-12 flex w-96 items-center gap-2 rounded-md bg-green-100 px-4 py-3 text-green-700 shadow-md transition-all"
				>
					<p>✅ Message sent successfully!</p>
				</div>
			{:else if form?.error}
				<div
					class="mx-auto mt-12 flex w-96 items-center gap-2 rounded-md bg-red-100 px-4 py-3 text-red-700 shadow-md transition-all"
				>
					<p>❌ Sending error: {form?.error}</p>
				</div>
			{/if}

			<form method="POST" class="mx-auto mt-12 flex max-w-96 flex-col text-left">
				<label for="first_name" class="mb-2">Name<span class="text-red-500">*</span></label>
				<input name="name" type="text" required />
				<div class="mb-4 text-sm text-neutral-500">First name</div>
				<input name="lastName" type="text" required />
				<div class="mb-4 text-sm text-neutral-500">Last name</div>
				<label for="email" class="mb-2">Email<span class="text-red-500">*</span></label>
				<input name="email" type="email" required />
				<label for="query" class="mt-4 mb-2">Message<span class="text-red-500">*</span></label>
				<textarea name="message" id="query" required></textarea>
				<div class="mb-4 text-sm text-neutral-500">Please explain your issue or concern.</div>
				<BlackButton type="submit">Submit</BlackButton>
			</form>
		</div>
	</div>
</main>
