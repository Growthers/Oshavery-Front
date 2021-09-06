import {client} from "./client";
import {AxiosError, AxiosResponse} from "axios";
import {message} from "../types/message";

type getUrl =
  `/channels/${string}/messages?limit=${number}`|
  `/channels/${string}/messages/${string}`

type deleteUrl =
  `/channels/${string}/messages/${string}`

type postUrl =
  `/channels/${string}/messages`
type postData = postMessageReq

type postMessageReq = {
  "content": string
}

type postMessageRes = {
  "id": string,
  "timestamp": string,
  "content": string,
  "guild_id": string,
  "channel_id": string,
  "edited_timestamp": string
}

type putUrl =
  `/channels/${string}/messages/${string}`
type putData = putMassageContentReq

type putMassageContentReq = {
  "content": string
}


export class Message {
  private isAxiosError = (error: any): error is AxiosError => {
    return !!error.isAxiosError;
  }

  private isMessages = (url: any): url is `/channels/${string}/messages` => {
    return !!url.isMessages;
  }

  private isMessagesAndQuery = (url: any): url is `/channels/${string}/messages?limit=${number}` => {
    return !!url.isMessagesAndQuery();
  }

  private isAMessage = (url: any): url is `/guilds/${string}` => {
    return !!url.isAMessage;
  }

  public get = async (url:getUrl) => {
    if (this.isMessagesAndQuery(url)) {
      try {
        const res:AxiosResponse<message[]> = await client.get<message[]>(url)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else if (this.isAMessage(url)) {
      try {
        const res: AxiosResponse<message> = await client.get<message>(url)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else {
      console.error("no match endpoint [lib/message.ts - get]")
    }
  }

  public delete = async (url: deleteUrl) => {
    if (this.isAMessage(url)) {
      try {
        const res: AxiosResponse = await client.delete(url)
        console.log(res.status, res.statusText)
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else {
      console.error("no match enppoint [lib/message.ts - delete]")
    }
  }

  public post = async (url: postUrl, data: postData) => {
    if (this.isMessages(url)) {
      try {
        const res: AxiosResponse<postMessageRes> = await client.post<postMessageRes>(url, data)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)){
          console.table(e)
        }
      }
    } else {
      console.error("no match endpoint [lib/message.ts - post]")
    }
  }

  public put = async (url: putUrl, data: putData) => {
    if (this.isAMessage(url)) {
      try {
        const res: AxiosResponse = await client.put(url, data)
        console.log(res.status, res.statusText)
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else {
      console.error("no match endpoint [lib/message.ts - put]")
    }
  }
}
