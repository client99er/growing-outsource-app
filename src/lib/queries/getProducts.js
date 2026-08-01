export const getProductsQuery = `
{
  products(first: 10) {
    edges {
      node {
        id
        title
        handle
		availableForSale
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
}
`;

export const getProductByHandleQuery = (handle) => `
  query {
    productByHandle(handle: "${handle}") {
      id
      title
      descriptionHtml
      handle

	  metafields(identifiers: [
        { namespace: "custom", key: "breadcrumb" },
        { namespace: "custom", key: "features" },
		{ namespace: "custom", key: "warranty_and_returns" },
      ]) {
        key
        namespace
        value
        type
        reference {
          ... on Collection {
            id
            handle
            title
          }
        }
      }

	  priceRange {
		minVariantPrice {
		  amount
		  currencyCode
		}
	  }

	  featuredImage {
		url
		altText 
	  }

      seo {
        title
        description
      }

      options {
        name
        values
      }

      images(first: 20) {
        nodes {
          url
          altText
        }
      }

      variants(first: 10) {
	  	edges {
			node {
				id
				title
				availableForSale
				price {
					amount
					currencyCode
				}
				compareAtPrice {
					amount
					currencyCode
				}
				selectedOptions {
					name
					value
				}
			}
		}
      }
    }
  }
`;

export function getSearchProductsQuery(query, sortBy = 'price-asc') {
	const { sortKey, reverse } = getSortParams(sortBy);

	return `
    {
      products(
        first: 100,
        query: "${query}",
        sortKey: ${sortKey},
        reverse: ${reverse},
      ) {
        edges {
          node {
            id
            handle
            title
            description
            featuredImage {
              url
              altText
              width
              height
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
					selectedOptions {
						name
						value
					}
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;
}

export const getRecommendationsQuery = (productId) => `
  query {
    productRecommendations(productId: "${productId}") {
      id
      title
      handle
      featuredImage {
        url
        altText
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;

function getSortParams(sortBy) {
	switch (sortBy) {
		case 'price-asc':
			return { sortKey: 'PRICE', reverse: false };
		case 'price-desc':
			return { sortKey: 'PRICE', reverse: true };
		default:
			return { sortKey: 'PRICE', reverse: false };
	}
}
