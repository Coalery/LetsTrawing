import React, { useState, useEffect } from 'react';
import { ChatData } from '../interfaces/ChatData';

import { init } from '../twitch';
import Paint from './Paint';
import TextOnly from './TextOnly';

import '../styles/main.scss';

type Status = 'loading' | 'wait-start' | 'progressing';

function IndexPage() {
  const [state, setState] = useState<Status>('loading');
  const [current, setCurrent] = useState<ChatData | null>(null);

  useEffect(() => {
    init(({ target, state, msg, self }) =>
      setCurrent({ target, state, msg, self })
    ).then(() => setState('wait-start'));
  }, []);

  return (
    <main>
      <title>Let's Trawing</title>

      {state === 'loading' ? (
        <TextOnly title="로딩중입니다. 잠시만 기다려주세요!" />
      ) : state === 'wait-start' ? (
        <TextOnly
          title="게임 시작을 기다리고 있어요."
          subtitles={[
            "스트리머 분이 직접 채팅창에 '!시작 [횟수]'를 입력해주세요.",
            '예를 들면, !시작 5 같이 말이죠!',
            '횟수는 최소 1번, 최대 100번까지 입력할 수 있어요.',
          ]}
        />
      ) : (
        <Paint current={current} />
      )}
    </main>
  );
}

export default IndexPage;
