import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { RichText } from 'prismic-reactjs';
import { queryHomeContent } from '../utils/prismicQueries';
import { DefaultLayout, Header, InfiniteLoader } from '../components';
import NotFound from './NotFound';

/**
 * Blog homepage component with an Infinite Loader button
 */
const BlogHomeInfiniteLoader = ({ location }) => {
  const [homeDoc, setHomeDoc] = useState(null);
  const [notFound, toggleNotFound] = useState(false);

  // Fetch the Prismic initial Prismic content on page load
  useEffect(() => {
    const fetchPrismicContent = async () => {
      const queryResponse = await queryHomeContent();
      const homeDocContent = queryResponse.data.allBlog_homes.edges[0].node;
      if (homeDocContent) {
        setHomeDoc(homeDocContent);
      } else {
        toggleNotFound(true);
      }
    };
    fetchPrismicContent();
  }, []);

  // Return the page if a document was retrieved from Prismic
  if (homeDoc) {
    const title = RichText.asText(homeDoc.headline);
    return (
      <DefaultLayout seoTitle={title}>
        <Header
          image={homeDoc.image}
          headline={homeDoc.headline}
          description={homeDoc.description}
          currentUrl={location.pathname}
        />
        <InfiniteLoader
          itemsPerPage={5} // up to a max of 20
        />
      </DefaultLayout>
    );
  }

  if (notFound) {
    return <NotFound />;
  }

  return null;
};

export default withRouter(BlogHomeInfiniteLoader);
