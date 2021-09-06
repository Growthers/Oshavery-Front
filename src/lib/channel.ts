import {client} from "./client";
import {AxiosError, AxiosResponse} from "axios";
import {channel, permission} from "../types/channel";

type getUrl =
  `/guilds/${string}/channels`|
  `/channels/${string}/permissions`

type deleteUrl = `/channels/${string}/permissions`

type postUrl =
  `/guilds/${string}/channels`|
  `/channels/${string}/permissions`

type postData = postCreateChannelReq | postCreateChannelPermissionReq

type postCreateChannelReq = {
  "channel_name": string,
  "channel_topics": string,
  "channel_type": string,
  "channel_position": number
}

type postCreateChannelPermissionReq = {
  "name": string,
  "permissions": string,
  "mentionable": boolean
}

type putUrl =
  `channels/${string}/permissions`
type putData = putChannelPermissionReq

type putChannelPermissionReq = {
  "name": string,
  "permission": string,
  "mentionable": boolean
}

type patchUrl =
  `/guilds/${string}/channels`

type patchData = patchChannelReq

type patchChannelReq = {
  "name": string,
  "position": number,
  "topic": string
}


export class Channel {

  private isAxiosError = (error: any): error is AxiosError => {
    return !!error.isAxiosError;
  }

  private isInChannels = (url: any): url is `/guilds/${string}/channels` => {
    return !!url.isInChannels;
  }

  private isInPermissions = (url: any): url is `/channels/${string}/permissions` => {
    return !!url.isInPermissions;
  }


  public get = async (url: getUrl) => {
    if (this.isInChannels(url)) {
      try {
        const res:AxiosResponse<channel[]> = await client.get<channel[]>(url)
        return res.data
      } catch (e) {
        if(this.isAxiosError(e)){
          console.table(e)
        }
      }
    } else if (this.isInPermissions(url)) {
      try {
        const res: AxiosResponse<permission[]> = await client.get<permission[]>(url)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)){
          console.table(e)
        }
      }
    } else {
      console.error("no match endpoint [lib/channel.ts - get]")
    }
  }

  public delete = async (url: deleteUrl) => {
    if (this.isInPermissions(url)){
      try {
        const res: AxiosResponse = await client.delete(url)
        console.log(res.status, res.data)
      } catch (e) {
        if (this.isAxiosError(e)){
          console.table(e)
        }
      }
    } else {
      console.error("no match endpoint [lib/channel.ts - delete]")
    }
  }

  public post = async (url: postUrl, data: postData) => {
    if (this.isInChannels(url)){
      try {
        const res: AxiosResponse<channel> = await client.post<channel>(url, data)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)){
          console.table(e)
        }
      }
    } else if (this.isInPermissions(url)) {
      try {
        const res: AxiosResponse = await client.post(url, data)
        console.log(res.status, res.statusText)
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else {
      console.error("no match endpoint [lib/channel.ts - post]")
    }
  }

  public put = async (url: putUrl, data: putData) => {
    if (this.isInPermissions(url)) {
      try {
        const res: AxiosResponse = await client.put(url, data)
        console.log(res.status, res.statusText)

      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else {
      console.error("no match endpoint [lib/channel.ts - put]")
    }
  }

  public patch = async (url: patchUrl, data: patchData) => {
    if (this.isInChannels(url)) {
      try {
        const res: AxiosResponse<channel> = await client.patch(url, data)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    }  else {
      console.error("no match endpoint [lib/channel.ts - patch]")
    }
  }

}
