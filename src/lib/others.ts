import {client} from "./client";
import {AxiosError, AxiosResponse} from "axios";
import {version} from "../types/others";

type getUrl = "/version"

export class Others {
  private isAxiosError = (error: any): error is AxiosError => {
    return !!error.isAxiosError;
  }

  public get = async (url: getUrl) => {
    if (url === "/version") {
      try {
        const res:AxiosResponse<version> = await client.get<version>(url)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else {
      console.error("no match endpoint [lib/others.ts - get]")
    }
  }
}
