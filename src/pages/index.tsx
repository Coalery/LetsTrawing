import React, { useState, useEffect } from 'react';
import { ChatData } from '../interfaces/ChatData';

import { init } from '../twitch';
import Loading from './Loading';
import Main from './Main';

import '../styles/main.scss';

const pageStyles = {
  color: '#232129',
  padding: 16,
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

function IndexPage() {
  const [initialized, setInitialized] = useState(false);
  const [current, setCurrent] = useState<ChatData | null>(null);

  useEffect(() => {
    init(({ target, state, msg, self }) =>
      setCurrent({ target, state, msg, self })
    ).then(() => setInitialized(true));
  }, []);

  return (
    <main style={pageStyles}>
      <title>Let's Trawing</title>
      {initialized ? <Main current={current} /> : <Loading />}
    </main>
  );
}

export default IndexPage;
