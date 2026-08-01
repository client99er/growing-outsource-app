export function getPageQuery(handle) {
	return `
    {
      page(handle: "${handle}") {
        id
        title
        body
        bodySummary
      }
    }
  `;
}

export function getHomePageQuery() {
	return `
    {
      page(handle: "home") {
        id
        title
		banner: metafield(namespace: "custom", key: "home_banner") {
			value
			reference {
				... on Metaobject {
					type
					field_title: field(key: "title") { value }
					field_subtitle: field(key: "subtitle") { value }
					field_description: field(key: "description") { value }
					field_cta: field(key: "cta") { value }
					field_cta_link: field(key: "cta_link") { value }
					field_images: field(key: "images") {
						references(first: 5) {
							nodes {
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
		}
		reviews: metafield(namespace: "custom", key: "home_review") {
			value
			references(first: 10) {
				nodes {
					... on Metaobject {
						type
						field_link: field(key: "link_text") { value }
						field_url: field(key: "link_url") { value }
						field_stars: field(key: "stars") { value }
						field_review: field(key: "review") { value }
						field_author: field(key: "author") { value }
						field_image: field(key: "image") {
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
		}
      }
    }
  `;
}

export function getFaqPageQuery() {
	return `
    {
      page(handle: "faq-page") {
        id
        title
		metafield(namespace: "custom", key: "faq") {
		  	references(first: 10) {
				edges {
					node {
					... on Metaobject {
						type
						section_field: field(key: "title") { value }
						section_items: field(key: "items") {
							references(first: 10) {
								edges {
									node {
										... on Metaobject {
											question_field: field(key: "question") { value }
											answer_field: field(key: "answer") { value }
										}
									}
								}
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
