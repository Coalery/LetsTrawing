import * as tmi from 'tmi.js';

export interface ChatData {
  target: string;
  state: tmi.ChatUserstate;
  msg: string;
  self: boolean;
}
