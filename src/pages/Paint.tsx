import EventEmitter from 'events';
import React, { useEffect, useRef, useState } from 'react';
import { DrawSpace } from '../components/DrawSpace';
import { Palette } from '../components/Palette';
import { ChatData } from '../interfaces/ChatData';
import { channel, whisper } from '../twitch';
import TextOnly from './TextOnly';

type MainParams = {
  remained: number;
  current: ChatData | null;
  onAnswer: (answerUser: string) => void;
};

export default function Paint({ remained, current, onAnswer }: MainParams) {
  const latestAnswer = useRef<string | null>(null);
  const [answerUser, setAnswerUser] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [color, setColor] = useState('black');
  const [thickness, setThickness] = useState(5);

  const emitter = new EventEmitter();
  const onErase = () => {
    emitter.emit('erase');
  };

  useEffect(() => {
    if (!answer && remained > 0) {
      whisper(answerUser ?? channel, '문제를 출제해주세요!');
    }
  }, [answer]);

  useEffect(() => {
    if (!current) return;
    const { command, args } = current.msg;

    if (command === '!정답') {
      if (!answer) return;
      if (args.length < 1) return;
      if (current.state.username === answerUser) return;

      const userAnswer = args.join('');
      if (answer !== userAnswer) return;

      latestAnswer.current = answer;
      onAnswer(current.state.username!);
      setAnswer(null);
      setAnswerUser(current.state.username!);
    }

    if (command === '!출제') {
      if (answer) return;
      if (args.length < 1) return;
      if (
        current.state.username === (answerUser ?? channel) ||
        current.state.username === channel
      ) {
        setAnswer(args.join(''));
        setAnswerUser(current.state.username);
      }
    }
  }, [current]);

  return answer ? (
    <div className="draw-space-container">
      <DrawSpace color={color} thickness={thickness} emitter={emitter} />
      <Palette
        onColorSelect={setColor}
        onErase={onErase}
        setThickness={setThickness}
        thickness={thickness}
      />
    </div>
  ) : (
    <TextOnly
      title={
        answerUser
          ? `${answerUser} 님이 맞췄어요! 정답은 ${latestAnswer.current} 였어요.`
          : '문제를 출제해주세요!'
      }
      subtitles={[
        ...(answerUser
          ? [
              `${answerUser}님에게 아까 귓속말을 보냈던 '러리'가 귓속말을 보냈을 거에요.`,
              "그 유저에게 '!출제 [문제]'를 보내주세요. 정답자가 계속 출제하지 않는다면, 스트리머도 출제할 수 있어요.",
            ]
          : ["아까 귓속말을 보냈던 '러리'에게 '!출제 [문제]'를 보내주세요."]),
        '띄어쓰기 여부는 상관 없으니, 원하시는 대로 입력해주시면 됩니다!',
        "정답을 알겠다면, '!정답 [생각하는 정답]을 채팅창에 입력해주세요.",
      ]}
    />
  );
}
