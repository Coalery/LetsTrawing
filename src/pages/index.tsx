import React, { useState, useEffect, useRef } from 'react';
import { ChatData } from '../interfaces/ChatData';

import { channel, init, whisper } from '../twitch';
import Paint from './Paint';
import TextOnly from './TextOnly';

import '../styles/main.scss';

type State = 'loading' | 'otp' | 'wait-start' | 'progressing';

function IndexPage() {
  const otp = useRef<string | null>(null);
  const [state, setState] = useState<State>('loading');
  const [remained, setRemained] = useState<number>(-1);
  const [current, setCurrent] = useState<ChatData | null>(null);

  useEffect(() => {
    init(({ channel, state, msg, self }) =>
      setCurrent({ channel, state, msg, self })
    ).then(() => {
      otp.current = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, '0');
      setState('otp');
    });
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

      if (remained < 1 || remained > 100) {
        whisper(channel, '1부터 100 사이의 횟수를 입력해주세요!');
        return;
      }

      setState('progressing');
      setRemained(remained);

      return;
    }

    if (state === 'otp' && command === '!인증') {
      if (current.state.username !== channel) return;
      if (current.state['message-type'] !== 'chat') return;
      if (args.length < 1) return;
      if (args[0].length != 6) return;
      if (args[0] !== otp.current) return;

      setState('wait-start');
    }
  }, [current]);

  return (
    <main>
      <title>Let's Trawing</title>

      {state === 'loading' ? (
        <TextOnly title="로딩중입니다. 잠시만 기다려주세요!" />
      ) : state === 'otp' ? (
        <TextOnly
          title="스트리머 본인임을 인증해주세요!"
          subtitles={[
            `채팅창에 스트리머 본인(${channel})이 '!인증 ${otp.current}'를 입력해주세요.`,
            '무분별한 귓속말 전송을 막기 위한 수단이에요.',
          ]}
        />
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
