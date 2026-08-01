const themes = {
	on_board: {
		name: 'On Board',
		logoPath: '/onboard.png',
		accountsUrl: 'https://accounts.onboardtravel.ph',
		telephone: '(02) 8887 4136',
		email: 'jlumibao.legrand@gmail.com',
		chatLink: 'https://m.me/onboardtravelph',
		social: {
			facebook: 'https://www.facebook.com/onboardtravelessentials',
			instagram: 'https://www.instagram.com/onboardtravelessentials/'
		},
		stores: [
			{
				name: 'SBSN Building Showroom - Makati',
				image: '/store-stock.webp',
				address: '1378 Newton St., Brgy. San Isidro, Makati City',
				map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.833371906789!2d121.00395207553402!3d14.551519478275557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c96c410d9a9f%3A0xd3d4a7079b8a8317!2s1378%20Newton%2C%20Makati%20City%2C%202400%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1759591250059!5m2!1sen!2sph',
				link: '/sbsn-building-showroom',
				flagship: true
			},
			{
				name: 'Fashion Rack - PITX',
				image: '/store-stock.webp',
				address: '1 Kennedy Road, Brgy. Tambo, Paranaque City',
				map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.582766407837!2d120.98480008291794!3d14.508625143157207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cea0f7bc1ec9%3A0x9d5753305ef65f08!2s1%20Kennedy%20Road%2C%20Para%C3%B1aque%2C%201701%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1759591017725!5m2!1sen!2sph',
				link: '/fashion-rack-pitx'
			},
			{
				name: 'Fashion Rack - Bulacan',
				image: '/store-stock.webp',
				address: 'Shell NLT Burol 11, 3016, Balagtas, Bulacan',
				map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3856.8945686521756!2d120.90636607553789!3d14.831174171389145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ad298a973d8b%3A0x38e904294afd2f1e!2sShell!5e0!3m2!1sen!2sph!4v1759590882542!5m2!1sen!2sph',
				link: '/fashion-rack-bulacan'
			},
			{
				name: 'Fashion Rack - Puregold Subic',
				image: '/store-stock.webp',
				address: 'Subic Bay Freeport Zone, Olongapo City, Zambales',
				map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.1284737956!2d120.27637867553746!3d14.818045971715089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33967117047d880f%3A0xfde90180b458b7c4!2sSubic%20Bay%20Freeport%20Zone!5e0!3m2!1sen!2sph!4v1759591381494!5m2!1sen!2sph',
				link: '/fashion-rack-puregold-subic'
			},
			{
				name: 'Fashion Rack - Puregold Clark',
				image: '/store-stock.webp',
				address: 'Clark Freeport Zone, Mabalacat, Pampanga',
				map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30804.99913775981!2d120.48020047431638!3d15.178931399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x339692a83b6f9dc7%3A0x2507364c7f9ceff2!2sClark%20Freeport%20Zone%20Building%20President%20Office!5e0!3m2!1sen!2sph!4v1759591429632!5m2!1sen!2sph',
				link: '/fashion-rack-puregold-clark'
			},
			{
				name: 'Fashion Rack - Boracay',
				image: '/store-stock.webp',
				address: 'Station 2, Boracay Island',
				map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.205234909737!2d121.92000473267022!3d11.960287756016518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a53c2210040847%3A0x27aa6fffda7727f!2sStation%202!5e0!3m2!1sen!2sph!4v1759591469147!5m2!1sen!2sph',
				link: '/fashion-rack-boracay'
			},
			{
				name: 'Fashion Rack - Shell SLEX',
				image: '/store-stock.webp',
				address: 'Shell Northbound SLT Barrio Sto. Tomas, Binan',
				map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3866.0125223813047!2d121.06982507553091!3d14.310705184107507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397d7fe2af97def%3A0xf0f6876b468c7c06!2sShell%20SLEX%20Northbound!5e0!3m2!1sen!2sph!4v1759591509426!5m2!1sen!2sph',
				link: '/fashion-rack-shell-slex'
			},
			{
				name: 'The Shoppes - Terminal 3',
				image: '/store-stock.webp',
				address: '4th Level Right Wing, NAIA Terminal 3, Pasay City',
				map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.3920938859005!2d121.00892808291911!3d14.519550742866278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cecbb48e6e6d%3A0xf72a7c7b134a39f!2sTerminal%203%2C%20Pasay%20City%2C%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1759591539733!5m2!1sen!2sph',
				link: '/the-shoppes-terminal-3'
			},
			{
				name: 'Travel Hub - Batangas Port',
				image: '/store-stock.webp',
				address: 'Batangas Port, Batangas City',
				map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.301607547137!2d121.04580387552423!3d13.760676497087104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd0543d07deda1%3A0x199b20a21d07dbc0!2sBatangas%20Port!5e0!3m2!1sen!2sph!4v1759591578025!5m2!1sen!2sph',
				link: '/travel-hub-batangas-port'
			}
		]
	},
	_7luxe: {
		name: '7LUXE',
		logoPath: '/7luxe.png',
		accountsUrl: 'https://accounts.7luxe.store',
		telephone: '(02) 8882 4226',
		email: 'admin@7luxe.store',
		chatLink: 'https://m.me/7luxeph',
		social: {
			facebook: 'https://www.facebook.com/7LUXEStore',
			tiktok: 'https://www.tiktok.com/@danny_7luxe'
		},
		stores: [
			{
				name: '7LUXE - NYC: NoHo',
				image: '/store-stock.webp',
				address: '56 Aguinaldo Highway, Barangay Bayan Luma, Imus City, Cavite 4103',
				link: '/flagship-details',
				map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.1284737956!2d120.27637867553746!3d14.818045971715089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33967117047d880f%3A0xfde90180b458b7c4!2sSubic%20Bay%20Freeport%20Zone!5e0!3m2!1sen!2sph!4v1759591381494!5m2!1sen!2sph',
				flagship: true
			},
			{
				name: '7LUXE -Store 1',
				image: '/store-stock.webp',
				map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.1284737956!2d120.27637867553746!3d14.818045971715089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33967117047d880f%3A0xfde90180b458b7c4!2sSubic%20Bay%20Freeport%20Zone!5e0!3m2!1sen!2sph!4v1759591381494!5m2!1sen!2sph',
				address: '12 Magsaysay Road, Barangay Malate, Manila, Metro Manila 1004',
				link: '/store-1-details'
			},
			{
				name: '7LUXE -Store 2',
				image: '/store-stock.webp',
				link: '/store-2-details',
				address: '12 Magsaysay Road, Barangay Malate, Manila, Metro Manila 1004',
				map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.1284737956!2d120.27637867553746!3d14.818045971715089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33967117047d880f%3A0xfde90180b458b7c4!2sSubic%20Bay%20Freeport%20Zone!5e0!3m2!1sen!2sph!4v1759591381494!5m2!1sen!2sph'
			},
			{
				name: '7LUXE -Store 3',
				image: '/store-stock.webp',
				link: '/store-3-details',
				address: '12 Magsaysay Road, Barangay Malate, Manila, Metro Manila 1004',
				map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.1284737956!2d120.27637867553746!3d14.818045971715089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33967117047d880f%3A0xfde90180b458b7c4!2sSubic%20Bay%20Freeport%20Zone!5e0!3m2!1sen!2sph!4v1759591381494!5m2!1sen!2sph'
			},
			{
				name: '7LUXE -Store 4',
				image: '/store-stock.webp',
				link: '/store-3-details',
				address: '12 Magsaysay Road, Barangay Malate, Manila, Metro Manila 1004',
				map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.1284737956!2d120.27637867553746!3d14.818045971715089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33967117047d880f%3A0xfde90180b458b7c4!2sSubic%20Bay%20Freeport%20Zone!5e0!3m2!1sen!2sph!4v1759591381494!5m2!1sen!2sph'
			}
		]
	}
};

const clientKey = import.meta.env.VITE_CLIENT_KEY;

export const theme = themes[clientKey] ?? themes['on_board'];
