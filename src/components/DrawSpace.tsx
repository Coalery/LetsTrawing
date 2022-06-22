import React, { createRef, useCallback, useEffect } from 'react';

type DrawSpace = {
  color: string;
};

export function DrawSpace({ color }: DrawSpace) {
  const canvasRef = createRef<HTMLCanvasElement>();
  let pos = {
    drawable: false,
    X: -1,
    Y: -1,
  };
  let ctx: CanvasRenderingContext2D;

  const initDraw = (event: MouseEvent) => {
    ctx.strokeStyle = color;
    ctx.beginPath();
    pos = { drawable: true, ...getPosition(event) };
  };

  const draw = (event: MouseEvent) => {
    if (pos.drawable) {
      pos = { ...pos, ...getPosition(event) };
      ctx.lineTo(pos.X, pos.Y);
      ctx.stroke();
    }
  };

  const finishDraw = () => {
    pos = { drawable: false, X: -1, Y: -1 };
  };

  const getPosition = (event: MouseEvent) => {
    return { X: event.offsetX, Y: event.offsetY };
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ctx = ctx ?? canvas.getContext('2d')!;
    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousedown', initDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', finishDraw);
    canvas.addEventListener('mouseout', finishDraw);
  }, [color]);

  return <canvas className="drawing-canvas" ref={canvasRef} />;
}
