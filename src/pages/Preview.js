/* eslint-disable no-console */
import React, { useEffect } from 'react';
import qs from 'qs';
import Prismic from 'prismic-javascript';
import { Loader } from '../components';
import { repoName, linkResolver } from '../prismic-configuration';

const previewClient = Prismic.client(`https://${repoName}.cdn.prismic.io/api/v2`);

/**
 * Prismic preview component
 */
const Preview = ({ history, location }) => {
  useEffect(() => {
    const { token, documentId } = qs.parse(location.search.slice(1));
    if (!token) {
      console.warn('No preview token available, check your configuration');
    }

    // Retrieve the correct URL for the document being previewed.
    // Once fetched, redirect to the given url
    previewClient.getPreviewResolver(token, documentId).resolve(linkResolver, '/')
      .then((url) => history.push(url));
  });

  return <Loader />;
};

export default Preview;
