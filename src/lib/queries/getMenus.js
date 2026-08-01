// src/lib/queries/getMenu.js
export function getMenuQuery(handle) {
	return `
    {
		main: menu(handle: "${handle}") {
			items {
				title
				url
				items {
					title
					url
				}
			}
		}
		footerShop: menu(handle: "footer-shop") {
			items {
				title
				url
			}
		}
		footerAbout: menu(handle: "footer-about") {
			items {
				title
				url
			}
		}
		footerHelp: menu(handle: "footer-help") {
			items {
				title
				url
			}
		}
    }
  `;
}
