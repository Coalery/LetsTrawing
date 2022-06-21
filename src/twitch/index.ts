import * as tmi from 'tmi.js';

export async function init(channel: string) {
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

    const commandName = msg.trim();

    if (commandName === '!dice') {
      client.say(target, `You rolled a 1`);
      console.log(`* Executed ${commandName} command`);
    } else {
      console.log(`* Unknown command ${commandName}`);
    }
  });

  client.on('connected', (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
  });

  await client.connect();
}
