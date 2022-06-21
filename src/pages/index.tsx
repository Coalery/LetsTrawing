import React, { useState, useEffect } from 'react';
import * as tmi from 'tmi.js';
import { ChatData } from '../interfaces/ChatData';

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
  const [current, setCurrent] = useState<ChatData | null>(null);

  useEffect(() => {
    init((target, context, msg, self) =>
      setCurrent({ target, context, msg, self })
    ).then(() => setInitialized(true));
  }, []);

  return (
    <main style={pageStyles}>
      {initialized ? <Main current={current} /> : <Loading />}
    </main>
  );
}

export default IndexPage;
