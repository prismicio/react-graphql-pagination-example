import React, { useEffect, useState } from 'react';
import { RichText } from 'prismic-reactjs';
import { BackButton, DefaultLayout, SliceZone } from '../components';
import NotFound from './NotFound';
import { queryPostByUid } from '../utils/prismicQueries';

/**
 * Blog post page component
 */
const Post = ({ match }) => {
  const [prismicDoc, setPrismicDoc] = useState(null);
  const [notFound, toggleNotFound] = useState(false);

  const uid = match.params.uid;

  // Get the blog post document from Prismic
  useEffect(() => {
    const fetchPrismicData = async () => {
      const prismicContent = await queryPostByUid(uid);
      const doc = prismicContent.data.allPosts.edges.length > 0
        ? prismicContent.data.allPosts.edges[0].node
        : null;

      if (doc) {
        setPrismicDoc(doc);
      } else {
        toggleNotFound(true);
      }
    };

    fetchPrismicData();
  }, [uid]);

  // Return the page if a document was retrieved from Prismic
  if (prismicDoc) {
    const title = prismicDoc.title && prismicDoc.title.length !== 0
      ? RichText.asText(prismicDoc.title)
      : 'Untitled';

    return (
      <DefaultLayout wrapperClass="main" seoTitle={title}>
        <div className="outer-container">
          <BackButton />
          <h1>{title}</h1>
        </div>
        <SliceZone sliceZone={prismicDoc.body} />
      </DefaultLayout>
    );
  }

  if (notFound) {
    return <NotFound />;
  }

  return null;
};

export default Post;
