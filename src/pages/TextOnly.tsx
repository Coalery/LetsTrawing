import React from 'react';

type TextOnlyProps = {
  title: string;
  subtitles?: string[];
};

export default function TextOnly({ title, subtitles }: TextOnlyProps) {
  return (
    <div className="text-only-page">
      <h1>{title}</h1>
      {subtitles?.map((subtitle, idx) => (
        <p key={`subtitle-${idx}`}>{subtitle}</p>
      ))}
    </div>
  );
}
