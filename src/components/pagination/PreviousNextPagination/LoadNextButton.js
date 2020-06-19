import React from 'react';
import Button from '../../Button';

const LoadNextButton = ({ hasNextPosts, onClick }) => {
  return (
    <Button
      className="next-button"
      text="Next Posts &rarr;"
      onClick={onClick}
      isDisabled={!hasNextPosts}
    />
  );
};

export default LoadNextButton;
