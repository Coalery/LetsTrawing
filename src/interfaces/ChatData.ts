import * as tmi from 'tmi.js';

export interface Message {
  command: string;
  args: string[];
}

export interface ChatData {
  channel: string;
  state: tmi.ChatUserstate;
  msg: Message;
  self: boolean;
}
