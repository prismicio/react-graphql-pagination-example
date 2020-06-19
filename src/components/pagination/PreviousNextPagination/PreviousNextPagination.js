import React, { useCallback, useEffect, useState } from 'react';
import { PostList } from '../../blog-home';
import LoadPreviousButton from './LoadPreviousButton';
import LoadNextButton from './LoadNextButton';
import { queryPosts, queryPreviousPosts } from '../../../utils/prismicQueries';

const PreviousNextPagination = ({ itemsPerPage }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [startCursor, setStartCursor] = useState(null);
  const [endCursor, setEndCursor] = useState(null);
  const [hasPreviousPosts, setHasPreviousPosts] = useState(false);
  const [hasNextPosts, setHasNextPosts] = useState(false);

  const setHasNextAndPreviousPosts = (newPosts) => {
    if (newPosts.pageInfo.hasPreviousPage) setHasPreviousPosts(true);
    else setHasPreviousPosts(false);

    if (newPosts.pageInfo.hasNextPage) setHasNextPosts(true);
    else setHasNextPosts(false);
  };

  const setNewCursors = (newPosts) => {
    const firstNewPost = newPosts.edges[0];
    setStartCursor(firstNewPost.cursor);

    const lastNewPost = newPosts.edges[newPosts.edges.length - 1];
    setEndCursor(lastNewPost.cursor);
  };

  const renderPosts = useCallback((newPosts) => {
    setBlogPosts(newPosts.edges.map((post) => post.node));
    setHasNextAndPreviousPosts(newPosts);
    setNewCursors(newPosts);
  }, []);

  const loadPreviousPosts = async () => {
    const previousPosts = await queryPreviousPosts(startCursor, itemsPerPage);
    renderPosts(previousPosts.data.allPosts);
  };

  const loadNextPosts = async () => {
    const nextPosts = await queryPosts(endCursor, itemsPerPage);
    renderPosts(nextPosts.data.allPosts);
  };

  // Fetch the first batch of posts when the component mounts
  useEffect(() => {
    const fetchInitialPosts = async () => {
      const initialCursor = null;
      const initialPosts = await queryPosts(initialCursor, itemsPerPage);
      renderPosts(initialPosts.data.allPosts);
    };
    fetchInitialPosts();
  }, [itemsPerPage, renderPosts]);

  return (
    <>
      <PostList posts={blogPosts} />
      <div className="container previous-next-button-wrapper">
        <LoadPreviousButton
          hasPreviousPosts={hasPreviousPosts}
          onClick={loadPreviousPosts}
        />
        <LoadNextButton
          hasNextPosts={hasNextPosts}
          onClick={loadNextPosts}
        />
      </div>
    </>
  );
};

export default PreviousNextPagination;
