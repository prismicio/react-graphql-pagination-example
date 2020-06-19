import React from 'react';
import { Link, withRouter } from 'react-router-dom';

/**
 * Post back button component
 */
const BackButton = ({ history }) => {
  return (
    <div className="back">
      <Link
        to="/"
        onClick={() => history.goBack()}
      >
        back to list
      </Link>
    </div>
  );
};

export default withRouter(BackButton);
