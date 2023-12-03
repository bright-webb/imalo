import React, { lazy, Suspense } from 'react';

const LazyPostProperty = lazy(() => import('./PostProperty'));

const PostProperty = props => (
  <Suspense fallback={null}>
    <LazyPostProperty {...props} />
  </Suspense>
);

export default PostProperty;
