import React, { useEffect, useState } from 'react';
import { Pagination } from 'semantic-ui-react';
import { PostList } from '../blog-home';
import { recursivelyFetchAllPosts } from '../../utils/prismicQueries';

const FullPagination = ({ itemsPerPage }) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [page, setPage] = useState(1);

  // Fetch all the posts when the component mounts
  useEffect(() => {
    const fetchAllPosts = async () => {
      const allPosts = await recursivelyFetchAllPosts();
      setBlogPosts(allPosts);
    };
    fetchAllPosts();
  }, [itemsPerPage]);

  const handlePaginationChange = (e, { activePage }) => setPage(activePage);


  const totalPosts = blogPosts.length;
  if (totalPosts < 1) return null;

  const firstPostIndex = (page - 1) * itemsPerPage;
  const lastPostIndex = firstPostIndex + itemsPerPage;
  const currentBlogPosts = blogPosts.slice(firstPostIndex, lastPostIndex);
  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);

  return (
    <>
      <PostList posts={currentBlogPosts} />
      <div className="container full-pagination-wrapper">
        <Pagination
          activePage={page}
          onPageChange={handlePaginationChange}
          totalPages={totalPages}
          firstItem={null}
          lastItem={null}
        />
      </div>
    </>
  );
};

export default FullPagination;
