import {user} from "../types/user";
import {client} from "./client";
import {guild} from "../types/guild";
import {AxiosError, AxiosResponse} from "axios";

type getUrl =
  `/users/${number}`|
  "/users"|
  "/users/me"|
  "/bots"

type getMyInfoRes = user & {"guild": guild[]};
export type getBotListReq = {
  "id": string,
  "botUserId": string,
  "description": string,
  "owner": {
    "id": string,
    "name": string,
    "avatar": string,
    "bot": boolean,
    "state": number
  },
  "state": number,
  "created_at": string,
  "updated_at": string
}[]


type deleteUrl = "/bots"


type postUrl = "/users"| "/bots"
type postReq = postCreateAUserReq| postCreateBotReq

type postCreateAUserReq = {
  "name": string,
  "password": string,
  "bot": boolean
}

type postCreateAUserRes = {
  "id": string,
  "bot": boolean,
  "name": string
}

export type postCreateBotReq = {
  "description": string,
  "name": string
}


type patchUrl =
  `/users/${number}`|
  "/users/me"
type patchReq = patchUpdateAUserInfoReq| patchUpdateMyInfoReq

type patchUpdateAUserInfoReq = {
  "name": string
}

type patchUpdateAUserInfoRes = {
  "user_id": string,
  "user_name": string,
  "user_avatar": string,
  "bot": boolean
}

type patchUpdateMyInfoReq = {
  "name": string
}

export class User {

  private isAxiosError = (error: any): error is AxiosError => {
    return !!error.isAxiosError;
  }

  private isTemplateLiteral = (url: any): url is `/users/${number}` => {
    return !!url.isTemplateLiteral;
  }

  public get = async (url: getUrl) => {
    if (this.isTemplateLiteral(url)) {
      try {
        const res:AxiosResponse<user> = await client.get<user>(url)
        return res.data
      } catch (e) {
        if(this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else if (url === "/users") {
      try {
        const res: AxiosResponse<user[]> = await client.get<user[]>(url)
        return res.data
      } catch (e) {
        if(this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else if (url === "/users/me") {
      try {
        const res: AxiosResponse<getMyInfoRes> = await client.get<getMyInfoRes>(url)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else if (url === "/bots") {
      try {
        const res:AxiosResponse<getBotListReq[]> = await client.get<getBotListReq[]>(url)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    }
  }

  public delete = async (url: deleteUrl) => {
    if (url === "/bots") {
      try {
        const res = await client.delete(url)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    }
  }

  public post = async (url: postUrl, data:postReq) => {
    if(url === "/users") {
      try {
        const res: AxiosResponse<postCreateAUserRes> = await  client.post<postCreateAUserRes>(url, data)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else if(url === "/bots") {
      try {
        const res = await client.post(url, data)
        console.log(res.status)
      } catch (e){
        if(this.isAxiosError(e)){
          console.table(e)
        }
      }
    }
  }

  public patch = async (url: patchUrl, data:patchReq) => {
    if(this.isTemplateLiteral(url)) {
      try {
        const res: AxiosResponse<patchUpdateAUserInfoRes> = await client.patch<patchUpdateAUserInfoRes>(url, data)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)){
          console.table(e)
        }
      }
    } else if(url === "/users/me") {
      try {
        const res: AxiosResponse = await client.patch(url, data)
        console.log(res.status)
      } catch (e) {
        if (this.isAxiosError(e)){
          console.table(e)
        }
      }
    }
  }


}
