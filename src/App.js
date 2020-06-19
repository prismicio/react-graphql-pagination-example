import React from 'react';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {
  BlogHomeAllPosts,
  BlogHomeFullPagination,
  BlogHomeInfiniteLoader,
  BlogHomePreviousNext,
  NotFound,
  Post,
  Preview,
} from './pages';
import { repoName } from './prismic-configuration';

/**
 * Main app component
 */
const App = () => {
  return (
    <>
      <Helmet>
        <script async defer src={`//static.cdn.prismic.io/prismic.js?repo=${repoName}&new=true`} />
      </Helmet>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/blog/" to="/" />
          <Redirect exact from="/" to="/all-posts" />
          <Route exact path="/all-posts" component={BlogHomeAllPosts} />
          <Route exact path="/full-pagination" component={BlogHomeFullPagination} />
          <Route exact path="/infinite-loader" component={BlogHomeInfiniteLoader} />
          <Route exact path="/previous-next" component={BlogHomePreviousNext} />
          <Route exact path="/preview" component={Preview} />
          <Route exact path="/blog/:uid" component={Post} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
