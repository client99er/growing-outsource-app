export const getBlogQuery = (blogHandle, articleHandle) => `
  query {
    blog(handle: "${blogHandle}") {
      articleByHandle(handle: "${articleHandle}") {
        title
        contentHtml
        authorV2 {
          name
        }
        publishedAt
        image {
          url
          altText
          width
          height
        }
      }
    }
  }
`;

export const getAllBlogsQuery = () => `
  query {
    blogs(first: 10) {
      edges {
        node {
          id
          title
          handle
          articles(first: 5, sortKey: PUBLISHED_AT, reverse: true) {
            edges {
              node {
                id
                handle
                title
                excerptHtml
                publishedAt
				authorV2 {
					name
				}
                image {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`;
