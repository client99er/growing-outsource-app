export const getAllCollections = `
  {
    collections(first: 250) {
      edges {
        node {
			id
			handle
			title
			description
			image {
				url
				altText
			}
			metafields(identifiers: [
				{ namespace: "custom", key: "is_main_category" },
				{ namespace: "custom", key: "main_category_photos" }
			]) {
				key
				value
				type
				reference {
					... on MediaImage {
						image {
							url
							altText
						}
					}
				}	
			}
        }
      }
    }
	products(first: 4, sortKey: BEST_SELLING) {
		edges {
			node {
				id
				handle
				title
				description
				featuredImage {
					url
					altText
				}
				priceRange {
					minVariantPrice {
						amount
						currencyCode
					}
					maxVariantPrice {
						amount
						currencyCode
					}
				}
				variants(first: 1) {
					edges {
						node {
							id
							availableForSale
							price {
								amount
							}
							compareAtPrice {
								amount
							}
						}
					}
				}
				tags
				productType
				vendor
			}
		}
	}
  }
`;

// filterName: Color
// filterValue: colors[]
export function getCollectionByHandle(
	handle,
	filterName = null,
	filterValue = null,
	sortBy = 'manual'
) {
	const { sortKey, reverse } = getSortParams(sortBy);

	// Just construct the filters
	const filterFragment = (filterName, filterValue) => {
		if (!filterName || !filterValue) return '';

		// Handle array of values (multiple colors, sizes, etc.)
		if (Array.isArray(filterValue)) {
			const filters = filterValue
				.map((value) => `{ variantOption: { name: "${filterName}", value: "${value}" } }`)
				.join(', ');
			return `filters: [${filters}]`;
		}

		// Handle single value (backward compatibility)
		return `filters: { variantOption: { name: "${filterName}", value: "${filterValue}" } }`;
	};

	const fragment = filterFragment(filterName, filterValue);

	return `
    {
      collection(handle: "${handle}") {
        id
        title
        description
        handle
        image {
          url
          altText
        }
        metafields(identifiers: [
          { namespace: "custom", key: "parent_collection" },
          { namespace: "custom", key: "child_collections" }
        ]) {
          key
          value
          type
          reference {
            ... on Collection {
              id
              title
              handle
              image {
                url
                altText
              }
            }
          }
          references(first: 100) {
            edges {
              node {
                ... on Collection {
                  id
                  title
                  handle
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
        products(first: 100, sortKey: ${sortKey}, reverse: ${reverse}${fragment ? `, ${fragment}` : ''}) {
          edges {
            node {
              id
              title
              handle
              featuredImage {
                url
                altText
              }
              variants(first: 1) {
                edges {
                  node {
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
}

function getSortParams(sortBy) {
	switch (sortBy) {
		case 'best-selling':
			return { sortKey: 'BEST_SELLING', reverse: false };
		case 'price-asc':
			return { sortKey: 'PRICE', reverse: false };
		case 'price-desc':
			return { sortKey: 'PRICE', reverse: true };
		case 'manual':
		default:
			return { sortKey: 'MANUAL', reverse: false };
	}
}
