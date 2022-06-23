import classNames from 'classnames';
import React, { useRef, useState, WheelEvent } from 'react';

type PaletteProps = {
  onColorSelect: (color: string) => void;
  onErase: () => void;
  setThickness: (change: (thickness: number) => number) => void;
  thickness: number;
};

export function Palette({
  onColorSelect,
  onErase,
  setThickness,
  thickness,
}: PaletteProps) {
  const cursorRef = useRef(0);
  const defaultColors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'pink',
    'brown',
    'white',
    'black',
  ];
  const [selectedColors, setSelectedColors] = useState<(string | undefined)[]>(
    Array.from({ length: 10 })
  );
  const [pos, setPos] = useState({ i: 0, j: 9 });

  const _onColorSelect = (color: string, i: number, j: number) => {
    setPos({ i, j });
    onColorSelect(color);
  };

  const increaseThickness = () => {
    setThickness((thickness) => {
      if (thickness <= 1) return thickness;
      return thickness - 1;
    });
  };

  const decreaseThickness = () => {
    setThickness((thickness) => {
      if (thickness >= 64) return thickness;
      return thickness + 1;
    });
  };

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 0) increaseThickness();
    if (event.deltaY < 0) decreaseThickness();
  };

  return (
    <div className="color-palette-container">
      {defaultColors.map((color, idx) => (
        <button
          key={`default-color-${idx}`}
          className={classNames('color-palette-item', {
            selected: pos.i === 0 && pos.j === idx,
          })}
          style={{ backgroundColor: color }}
          type="button"
          onClick={() => _onColorSelect(color, 0, idx)}
        />
      ))}
      <input
        className="color-palette-item"
        type="color"
        onChange={(event) => {
          const cursor = cursorRef.current;
          const colors = [...selectedColors];
          colors[cursor] = event.target.value;
          cursorRef.current = (cursorRef.current + 1) % selectedColors.length;
          setSelectedColors(colors);
        }}
      />
      {selectedColors.map((color, idx) => (
        <button
          key={`selected-color-${idx}`}
          className={classNames('color-palette-item', {
            selected: pos.i === 1 && pos.j === idx,
          })}
          style={{ backgroundColor: color }}
          type="button"
          onClick={() => {
            if (!color) return;
            _onColorSelect(color, 1, idx);
          }}
        />
      ))}
      <button className="color-palette-item eraser" onClick={onErase}>
        <svg
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#000000"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 19h-11l-4 -4a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9 9" />
          <line x1="18" y1="12.3" x2="11.7" y2="6" />
        </svg>
      </button>
      <div className="thickness" onWheel={onWheel}>
        <svg width="100" viewBox="0 0 100 100">
          <circle cx="50%" cy="50%" r={thickness / 2} />
        </svg>
      </div>
    </div>
  );
}
