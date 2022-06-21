import * as tmi from 'tmi.js';

export interface ChatData {
  target: string;
  context: tmi.ChatUserstate;
  msg: string;
  self: boolean;
}
