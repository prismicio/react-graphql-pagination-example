import React, { useEffect, useState } from 'react';
import { PostList } from '../../blog-home';
import LoadMoreButton from './LoadMoreButton';
import { queryPosts } from '../../../utils/prismicQueries';

const InfiniteLoader = ({ itemsPerPage }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentCursor, setCurrentCursor] = useState(null);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const renderMorePosts = (currentBlogPosts, morePosts) => {
    const newPosts = morePosts.edges.map((post) => post.node);
    setBlogPosts([...currentBlogPosts, ...newPosts]);

    const lastNewPost = morePosts.edges[morePosts.edges.length - 1];
    setCurrentCursor(lastNewPost.cursor);

    if (!morePosts.pageInfo.hasNextPage) {
      setHasMorePosts(false);
    }
  };

  const loadMorePosts = async () => {
    const morePosts = await queryPosts(currentCursor, itemsPerPage);
    renderMorePosts(blogPosts, morePosts.data.allPosts);
  };

  // Fetch the first batch of posts when the component mounts
  useEffect(() => {
    const fetchInitialPosts = async () => {
      const initialCursor = null;
      const initialPosts = await queryPosts(initialCursor, itemsPerPage);
      renderMorePosts([], initialPosts.data.allPosts);
    };
    fetchInitialPosts();
  }, [itemsPerPage]);

  return (
    <>
      <PostList posts={blogPosts} />
      <LoadMoreButton
        hasMorePosts={hasMorePosts}
        onClick={loadMorePosts}
      />
    </>
  );
};

export default InfiniteLoader;
