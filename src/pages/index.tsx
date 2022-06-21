import React, { useState, useEffect } from 'react';
import { init } from '../twitch';
import Loading from './Loading';
import Main from './Main';

const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

function IndexPage() {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    init('doralife12').then(() => setInitialized(true));
  }, []);

  return <main style={pageStyles}>{initialized ? <Main /> : <Loading />}</main>;
}

export default IndexPage;
