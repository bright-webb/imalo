import React, { lazy, Suspense } from 'react';

const LazyTemplatesHeader = lazy(() => import('./TemplatesHeader'));

const TemplatesHeader = props => (
  <Suspense fallback={null}>
    <LazyTemplatesHeader {...props} />
  </Suspense>
);

export default TemplatesHeader;
