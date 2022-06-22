import React, { useRef, useState } from 'react';

type PaletteProps = {
  onColorSelect: (color: string) => void;
};

export function Palette({ onColorSelect }: PaletteProps) {
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

  return (
    <div className="color-palette-container">
      {defaultColors.map((color, idx) => (
        <button
          key={`default-color-${idx}`}
          className="color-palette-item"
          style={{ backgroundColor: color, border: '0' }}
          type="button"
          onClick={() => onColorSelect(color)}
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
          className="color-palette-item"
          style={{ backgroundColor: color, border: '0' }}
          type="button"
          onClick={() => {
            if (!color) return;
            onColorSelect(color);
          }}
        />
      ))}
    </div>
  );
}
