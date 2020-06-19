import React, { useCallback, useEffect, useState } from 'react';
import { PostList } from '../blog-home';
import { queryPosts } from '../../utils/prismicQueries';

const AllPostsLoader = () => {
  const [blogPosts, setBlogPosts] = useState(null);

  // Recursive function to retrieve all posts
  const recursivelyFetchAllPosts = useCallback(async (currentCursor = null) => {
    const response = await queryPosts(currentCursor);
    const currentPosts = response.data.allPosts.edges.map((edge) => edge.node);

    if (!response.data.allPosts.pageInfo.hasNextPage) {
      return currentPosts;
    }

    const newCursor = response.data.allPosts.pageInfo.endCursor;
    const newPosts = await recursivelyFetchAllPosts(newCursor);

    return [...currentPosts, ...newPosts];
  }, []);

  // Fetch all posts when the component mounts
  useEffect(() => {
    const fetchAllPosts = async () => {
      const allPosts = await recursivelyFetchAllPosts();
      setBlogPosts(allPosts);
    };
    fetchAllPosts();
  }, [recursivelyFetchAllPosts]);

  if (blogPosts) {
    return (
      <PostList posts={blogPosts} />
    );
  }
  return null;
};

export default AllPostsLoader;
