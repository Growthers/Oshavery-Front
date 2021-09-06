import {client} from "./client";
import {AxiosError, AxiosResponse} from "axios";
import {serverInfo} from "../types/server-info";

type url = "/server-info"

type data = {
  "instance_name": string,
  "admin": {
    "account": string,
    "mail": string
  },
  "tos": string,
  "privacy_policy": string
}

export class ServerInfo {
  private isAxiosError = (error: any): error is AxiosError => {
    return !!error.isAxiosError;
  }

  public get = async (url:url) => {
    try {
      const res:AxiosResponse<serverInfo> = await client.get<serverInfo>(url)
      return res.data
    } catch (e) {
      if (this.isAxiosError(e)) {
        console.table(e)
      }
    }
  }

  public post = async (url: url, data: data) => {
    try {
      const res: AxiosResponse<serverInfo> = await client.post<serverInfo>(url, data)
      return res.data
    } catch (e) {
      if (this.isAxiosError(e)) {
        console.table(e)
      }
    }
  }

  public patch = async (url: url, data: data) => {
    try {
      const res: AxiosResponse<data> = await client.patch<data>(url, data)
      return res.data
    } catch (e) {
      if (this.isAxiosError(e)) {
        console.table(e)
      }
    }
  }
}
