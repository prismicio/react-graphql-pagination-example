// -- Prismic API endpoint
// Determines which repository to query and fetch data from
// Configure your site's access point here
export const repoName = 'prismic-pagination-demo';
export const apiEndpoint = `https://${repoName}.cdn.prismic.io/graphql`;

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  if (doc.type === 'post') return `/blog/${doc.uid}`;
  return '/';
};
