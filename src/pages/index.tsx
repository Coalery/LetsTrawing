import React, { useState, useEffect } from 'react';
import { ChatData } from '../interfaces/ChatData';

import { channel, init, whisper } from '../twitch';
import Paint from './Paint';
import TextOnly from './TextOnly';

import '../styles/main.scss';

type State = 'loading' | 'wait-start' | 'progressing';

function IndexPage() {
  const [state, setState] = useState<State>('loading');
  const [remained, setRemained] = useState<number>(-1);
  const [current, setCurrent] = useState<ChatData | null>(null);

  useEffect(() => {
    init(({ channel, state, msg, self }) =>
      setCurrent({ channel, state, msg, self })
    ).then(() => setState('wait-start'));
  }, []);

  useEffect(() => {
    if (state === 'wait-start') {
      whisper(channel, '플레이할 라운드 수를 입력해주세요!');
    }
  }, [state]);

  useEffect(() => {
    console.log(remained);
    if (remained === 0) {
      setState('wait-start');
      setRemained(-1);
    }
  }, [remained]);

  useEffect(() => {
    if (!current) return;
    const { command, args } = current.msg;

    if (state === 'wait-start' && command === '!시작') {
      if (current.state.username !== channel) return;

      if (current.state['message-type'] !== 'whisper') return;

      if (args.length < 1) {
        whisper(channel, '횟수를 입력해주세요.');
        return;
      }

      if (!args[0].match(/[0-9]+/)) {
        whisper(channel, '횟수는 숫자로 입력해주세요.');
        return;
      }

      const remained = parseInt(current.msg.args[0]);
      setState('progressing');
      setRemained(remained);

      return;
    }
  }, [current]);

  return (
    <main>
      <title>Let's Trawing</title>

      {state === 'loading' ? (
        <TextOnly title="로딩중입니다. 잠시만 기다려주세요!" />
      ) : state === 'wait-start' ? (
        <TextOnly
          title="게임 시작을 기다리고 있어요."
          subtitles={[
            "스트리머 분에게 방금 '러리'라는 유저에게서 귓속말이 도착했을 거에요.",
            "해당 유저에게 '!시작 [횟수]'를 보내주세요.",
            '예를 들면, !시작 5 같이 말이죠!',
            '횟수는 최소 1번, 최대 100번까지 입력할 수 있어요.',
            `인식된 스트리머: ${channel}`,
          ]}
        />
      ) : (
        <Paint
          remained={remained}
          current={current}
          onAnswer={(answerUser) => {
            setRemained((r) => r - 1);
          }}
        />
      )}
    </main>
  );
}

export default IndexPage;
