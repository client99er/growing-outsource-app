<script>
	import '../app.css';
	import { theme } from '$lib/config/theme';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=TikTok+Sans:opsz,wght@12..36,300..900&display=swap"
		rel="stylesheet"
	/>
	<title>{theme.name}</title>
</svelte:head>

{@render children()}
