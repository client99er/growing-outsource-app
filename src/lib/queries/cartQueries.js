// Just get qty
export const cartQuery = `
  query GetCart($cartId: ID!) {
    cart(id: $cartId) {
      id
      totalQuantity
      checkoutUrl
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  title
                  handle
                  featuredImage {
                    url
                  }
                }
              }
            }
          }
        }
      }
      cost {
        subtotalAmount {
          amount
        }
        totalAmount {
          amount
        }
      }
    }
    
    # Recommended products
    products(first: 4, sortKey: BEST_SELLING) {
      edges {
        node {
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
          variants(first: 1) {
            edges {
              node {
                id
                title
                availableForSale
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const createCartMutation = `
	mutation CartCreate($lines: [CartLineInput!]) {
		cartCreate(input: { lines: $lines }) {
			cart {
			id
			checkoutUrl
			lines(first: 10) {
				edges {
				node {
					id
					quantity
					merchandise {
					... on ProductVariant {
						id
						title
					}
					}
				}
				}
			}
			}
		}
	}
`;

export const addToCartMutation = `
	mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
		cartLinesAdd(cartId: $cartId, lines: $lines) {
			cart {
				id
				lines(first: 10) {
					edges {
						node {
							id
							quantity
							merchandise {
								... on ProductVariant {
									id
								}
							}
						}
					}
				}
			}
			userErrors {
				field
				message
			}
		}
	}
`;

export const removeCartItemMutation = `
  mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      userErrors {
        field
        message
      }
    }
  }
`;

export const updateCartItemMutation = `
  	mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
		cartLinesUpdate(cartId: $cartId, lines: $lines) {
			userErrors {
				field
				message
			}
		}
	}
`;
