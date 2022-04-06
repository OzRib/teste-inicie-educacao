import "@styles/index.css";
import React from 'react';
import RoadmapProvider from '@providers/roadmap';

export default function App({ Component, pageProps }) {
  return (
    <RoadmapProvider>
      <Component {...pageProps} />
    </RoadmapProvider>
  )
}
