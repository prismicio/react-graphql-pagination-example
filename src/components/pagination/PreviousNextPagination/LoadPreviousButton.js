import React from 'react';
import Button from '../../Button';

const LoadPreviousButton = ({ hasPreviousPosts, onClick }) => {
  return (
    <Button
      className="previous-button"
      text="&larr; Previous Posts"
      onClick={onClick}
      isDisabled={!hasPreviousPosts}
    />
  );
};

export default LoadPreviousButton;
