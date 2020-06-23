import gql from 'graphql-tag';
import Cookies from 'js-cookie';
import { client } from './prismicHelpers';

/*
 * Blog homepage query
 */
const blogHomeQuery = gql`
query blogHomeQuery {
  allBlog_homes {
    edges {
      node {
        headline
        description
        image
      }
    }
  }
}
`;

export const queryHomeContent = async () => {
  return client.query({
    query: blogHomeQuery,
  });
};

/*
 * Blog post list queries
 */
const blogPostsQuery = gql`
query morePosts($currentCursor: String, $itemsPerPage: Int) {
  allPosts(after: $currentCursor, first: $itemsPerPage, sortBy:date_DESC) {
    totalCount
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        ...postContent
      }
    }
  }
}
`;

const previousBlogPostsQuery = gql`
query morePosts($currentCursor: String, $itemsPerPage: Int) {
  allPosts(before: $currentCursor, last: $itemsPerPage, sortBy:date_DESC) {
    totalCount
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        ...postContent
      }
    }
  }
}
`;

const blogPostsFragment = gql`
fragment postContent on Post {
  _meta {
    id
    uid
    type
  }
  title
  body {
    ... on PostBodyText {
      type
      primary {
        text
      }
    }
  }
}
`;

const maxItemsPerPage = 20; // The limit of the GraphQL API is 20 items

export const queryPosts = async (currentCursor = null, itemsPerPage = maxItemsPerPage) => {
  return client.query({
    query: gql`
      ${blogPostsQuery}
      ${blogPostsFragment}
    `,
    variables: { currentCursor, itemsPerPage },
  });
};

export const queryPreviousPosts = async (currentCursor = null, itemsPerPage = maxItemsPerPage) => {
  return client.query({
    query: gql`
      ${previousBlogPostsQuery}
      ${blogPostsFragment}
    `,
    variables: { currentCursor, itemsPerPage },
  });
};

export const recursivelyFetchAllPosts = async (currentCursor = null) => {
  const response = await queryPosts(currentCursor);
  const currentPosts = response.data.allPosts.edges.map((edge) => edge.node);

  if (!response.data.allPosts.pageInfo.hasNextPage) {
    return currentPosts;
  }

  const newCursor = response.data.allPosts.pageInfo.endCursor;
  const newPosts = await recursivelyFetchAllPosts(newCursor);

  return [...currentPosts, ...newPosts];
};

/*
 * Blog Post query
 */
const blogPostQuery = gql`
query myPost($uid: String) {
  allPosts(uid: $uid) {
    edges {
      node {
        _meta {
          id
          uid
          type
        }
        title
        date
        body {
          ... on PostBodyText {
            type
            primary {
              text
            }
          }
          ... on PostBodyQuote {
            type
            primary {
              quote
            }
          }
          ... on PostBodyImage_with_caption {
            type
            primary {
              image
              caption
            }
          }
        }
      }
    }
  }
}
`;

export const queryPostByUid = (uid) => {
  const previewCookie = Cookies.get('io.prismic.preview');

  const queryOptions = {
    query: blogPostQuery,
    variables: { uid },
  };

  if (previewCookie) {
    queryOptions.context = {
      headers: {
        'Prismic-ref': previewCookie,
      },
    };
  }

  return client.query(queryOptions);
};
