export function getShopQuery() {
	return `
    {
      shop {
        metafield(namespace: "custom", key: "announcement_bar") {
			value
			type
        }
		metafields(identifiers: [
          { namespace: "custom", key: "reasons_to_reference" },
          { namespace: "custom", key: "another_metafield" }
        ]) {
			key
			namespace
			value
			type
			reference {
				... on Metaobject {
					id
					handle
					fields {
						key
						value
					}
				}
			}
        }
      }
    }
  `;
}
