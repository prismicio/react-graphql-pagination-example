/* eslint-disable no-console */
import React, { useEffect } from 'react';
import qs from 'qs';
import Prismic from 'prismic-javascript';
import { Loader } from '../components';
import { repoName, linkResolver } from '../prismic-configuration';

const previewApi = Prismic.client(`https://${repoName}.cdn.prismic.io/api/v2`);

/**
 * Prismic preview component
 */
const Preview = ({ history, location }) => {
  useEffect(() => {
    const params = qs.parse(location.search.slice(1));
    if (!params.token) {
      console.warn(`Unable to retrieve the session token from provided url. \n
      Check https://prismic.io/docs/rest-api/beyond-the-api/the-preview-feature for more info`);
    }

    // Retrieve the correct URL for the document being previewed.
    // Once fetched, redirect to the given url
    previewApi.previewSession(params.token, linkResolver, '/')
      .then((url) => history.push(url));
  });

  return <Loader />;
};

export default Preview;
