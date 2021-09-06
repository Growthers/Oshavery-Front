import {guild} from "./guild";

export type user = {
  "id": string,
  "name": string,
  "avatar": string,
  "bot": boolean,
  "state": number
}

export type myInfo = user & {"guild": guild[]};
