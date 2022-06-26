import * as tmi from 'tmi.js';
import { Message } from '../interfaces/ChatData';

type onCommandFunction = (context: {
  channel: string;
  state: tmi.ChatUserstate;
  msg: Message;
  self: boolean;
}) => void;

export const channel = process.env.GATSBY_CHANNEL as string;
const client = new tmi.client({
  identity: {
    username: process.env.GATSBY_USERNAME,
    password: process.env.GATSBY_PASSWORD,
  },
  channels: [channel],
});

function parseCommand(originMessage: string): Message {
  const splittedMeessage = originMessage.split(' ');

  return {
    command: splittedMeessage[0],
    args: splittedMeessage.length === 1 ? [] : splittedMeessage.slice(1),
  };
}

export async function send(message: string) {
  await client.say(channel, message);
}

export async function whisper(target: string, message: string) {
  await client.whisper(target, message);
}

export async function init(onCommand: onCommandFunction): Promise<void> {
  client.on('message', (channel, state, msg, self) => {
    if (self || !state.username) {
      return;
    }
    if (msg[0] != '!') return;

    onCommand({ channel, state, msg: parseCommand(msg), self });
  });

  await client.connect();
  console.log('Connected!');
}
