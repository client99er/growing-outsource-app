<script>
	import { theme } from '$lib/config/theme';
	import { page } from '$app/state';
	import SubcribeBox from './subcribe-box.svelte';
	import { FacebookIcon, Instagram, InstagramIcon } from 'lucide-svelte';

	const shopMenus = $derived(page.data.footerMenus.shop);
	const aboutMenus = $derived(page.data.footerMenus.about);
	const helpMenus = $derived(page.data.footerMenus.help);

	function cleanUrl(url) {
		try {
			return new URL(url).pathname;
		} catch {
			return url;
		}
	}
</script>

<div class="bg-lime-50 px-5">
	<footer class="mx-auto pt-20 pb-4 text-neutral-700 2xl:max-w-[114rem]">
		<div class="flex flex-col justify-between lg:flex-row">
			<SubcribeBox name={theme.name} />
			<div
				class="mt-10 flex flex-col justify-center space-x-16 py-0 md:flex-row lg:mt-0 [&_a]:hover:underline [&_h3]:mt-8 lg:[&_h3]:mt-0"
			>
				<div>
					<h3 class="font-semibold">SHOP</h3>
					<div role="navigation" aria-label="Footer navigation">
						<ul class="[&>li]:my-6">
							{#each shopMenus as item}
								<li><a href={cleanUrl(item.url)}>{item.title}</a></li>
							{/each}
						</ul>
					</div>
				</div>
				<div>
					<h3 class="font-semibold">ABOUT</h3>
					<div role="navigation" aria-label="Footer navigation">
						<ul class="[&>li]:my-6">
							{#each aboutMenus as item}
								<li><a href={cleanUrl(item.url)}>{item.title}</a></li>
							{/each}
							<li>
								<div class="flex space-x-3">
									{#if theme.social?.instagram}
										<a href={theme.social.instagram} target="_blank" rel="noopener noreferrer">
											<Instagram></Instagram>
										</a>
									{/if}
									{#if theme.social?.facebook}
										<a href={theme.social.facebook} target="_blank" rel="noopener noreferrer">
											<FacebookIcon></FacebookIcon>
										</a>
									{/if}
									{#if theme.social?.tiktok}
										<a href={theme.social.tiktok} target="_blank" rel="noopener noreferrer">
											<div class="w-6">
												<img src="/tik-tok.png" alt="tiktok" />
											</div>
										</a>
									{/if}
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div>
					<h3 class="font-semibold">GET HELP</h3>
					<div role="navigation" aria-label="Footer navigation">
						<ul class="[&>li]:my-6">
							{#each helpMenus as item}
								<li><a href={cleanUrl(item.url)}>{item.title}</a></li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
		</div>

		<p class="mt-4 text-center text-xs">
			© {new Date().getFullYear()}, {theme.name} Philippines. All Rights Reserved.
		</p>
	</footer>
</div>
