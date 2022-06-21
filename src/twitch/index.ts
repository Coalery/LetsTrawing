import * as tmi from 'tmi.js';

export async function init(
  onCommand: (
    target: string,
    context: tmi.ChatUserstate,
    msg: string,
    self: boolean
  ) => void
) {
  const channel = process.env.GATSBY_CHANNEL as string;

  const client = new tmi.client({
    identity: {
      username: process.env.GATSBY_USERNAME,
      password: process.env.GATSBY_PASSWORD,
    },
    channels: [channel],
  });

  client.on('message', (target, context, msg, self) => {
    if (self || !context.username) {
      return;
    }
    onCommand(target, context, msg, self);
  });

  client.on('connected', (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
  });

  await client.connect();
}
