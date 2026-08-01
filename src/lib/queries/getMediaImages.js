export const getMediaImages = `
  query GetMediaImages($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on MediaImage {
        id
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
