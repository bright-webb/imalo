import React, { lazy, Suspense } from 'react';

const LazyUploadPropertyImages = lazy(() => import('./UploadPropertyImages'));

const UploadPropertyImages = props => (
  <Suspense fallback={null}>
    <LazyUploadPropertyImages {...props} />
  </Suspense>
);

export default UploadPropertyImages;
