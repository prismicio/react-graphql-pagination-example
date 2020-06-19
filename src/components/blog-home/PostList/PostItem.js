import React from 'react';
import { Link } from 'react-router-dom';
import { RichText } from 'prismic-reactjs';

import PostDate from './PostDate';
import FirstParagraph from './FirstParagraph';
import { linkResolver } from '../../../prismic-configuration';

/**
 * Post list item component
 */
const PostItem = ({ post }) => {
  // console.log(post.title)
  const title = post.title
    ? RichText.asText(post.title)
    : 'Untitled';

  return (
    <div className="blog-post">
      <Link to={linkResolver(post._meta)}>
        <h2>{title}</h2>
      </Link>

      <PostDate date={post.date} />

      <FirstParagraph
        sliceZone={post.body}
        textLimit={300}
      />
    </div>
  );
};

export default PostItem;
