import React from 'react';
import { ChatData } from '../interfaces/ChatData';

type MainParams = {
  current: ChatData | null;
};

export default function Main({ current }: MainParams) {
  return (
    <div>
      <title>Home Page</title>
      <h1>
        {current?.context.username}: {current?.msg}
      </h1>
    </div>
  );
}
