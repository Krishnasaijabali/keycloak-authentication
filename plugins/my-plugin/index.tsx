import React from 'react';
import { createFrontendPlugin, PageBlueprint } from '@backstage/frontend-plugin-api';

// This creates a new extension, in this case, a page.
const myPage = PageBlueprint.make({
  params: {
    defaultPath: '/',  // Route where the page will be served
    loader: () => import('./MyPage').then(m => <m.MyPage />),
  },
});

// Creating a new frontend plugin with a unique ID and extensions (pages in this case)
export default createFrontendPlugin({
  id: 'my-plugin',
  extensions: [myPage],
});
