import React from 'react';
import { Link } from 'react-router-dom';

const PaginationNav = ({ currentUrl }) => {
  const navLinks = [{
    url: '/all-posts',
    label: 'Load All Posts',
  }, {
    url: '/infinite-loader',
    label: 'Infinite Loader',
  }, {
    url: '/previous-next',
    label: 'Previous/Next Buttons',
  }, {
    url: '/full-pagination',
    label: 'Full Pagination',
  }];

  const links = navLinks.map((link, index) => {
    const activeClass = currentUrl === link.url ? 'selected' : '';
    return (
      <Link
        to={link.url}
        className={activeClass}
        key={`nav-link-${index}`}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <div className="pagination-nav">
      {links}
    </div>
  );
};

export default PaginationNav;
