import React from 'react';

const Button = ({ className, text, onClick, isDisabled }) => {
  const disabledClass = isDisabled ? 'disabled' : '';
  const onClickHandler = () => {
    if (isDisabled) return () => {};
    return onClick;
  };

  return (
    <div
      className={`button ${className} ${disabledClass}`}
      onClick={onClickHandler()}
      onKeyPress={onClickHandler()}
      role="button"
      tabIndex={0}
    >
      {text}
    </div>
  );
};

export default Button;
