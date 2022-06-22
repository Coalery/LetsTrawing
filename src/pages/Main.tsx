import React, { useState } from 'react';
import { DrawSpace } from '../components/DrawSpace';
import { Palette } from '../components/Palette';
import { ChatData } from '../interfaces/ChatData';

type MainParams = {
  current: ChatData | null;
};

export default function Main({ current }: MainParams) {
  const [color, setColor] = useState('black');

  return (
    <div className="draw-space-container">
      <DrawSpace color={color} />
      <Palette onColorSelect={setColor} />
    </div>
  );
}
