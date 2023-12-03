import React, { lazy, Suspense } from 'react';

const LazyDownloadApp = lazy(() => import('./DownloadApp'));

const DownloadApp = props => (
  <Suspense fallback={null}>
    <LazyDownloadApp {...props} />
  </Suspense>
);

export default DownloadApp;
