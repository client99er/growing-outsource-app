export function getPolicies() {
	return `
		query {
			shop {
				privacyPolicy {
					title
					body
				}
				termsOfService {
					title
					body
				}
			}
		}
	`;
}
