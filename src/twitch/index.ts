import * as tmi from 'tmi.js';

type onCommandFunction = (context: {
  target: string;
  state: tmi.ChatUserstate;
  msg: string;
  self: boolean;
}) => void;

const channel = process.env.GATSBY_CHANNEL as string;
const client = new tmi.client({
  identity: {
    username: process.env.GATSBY_USERNAME,
    password: process.env.GATSBY_PASSWORD,
  },
  channels: [channel],
});

export async function send(message: string) {
  await client.say(channel, message);
}

export async function whisper(target: string, message: string) {
  await client.whisper(target, message);
}

export async function init(onCommand: onCommandFunction) {
  client.on('message', (target, state, msg, self) => {
    if (self || !state.username) {
      return;
    }
    onCommand({ target, state, msg, self });
  });

  client.on('connected', (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
  });

  await client.connect();
}
