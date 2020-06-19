import React from 'react';
import Button from '../../Button';

const LoadMoreButton = ({ hasMorePosts, onClick }) => {
  if (!hasMorePosts) return null;
  return (
    <div className="container button-wrapper">
      <Button
        className="button"
        text="Load More..."
        onClick={onClick}
      />
    </div>
  );
};

export default LoadMoreButton;
