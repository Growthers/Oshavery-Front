import {client} from "./client";
import {guild, role, inviteLink} from "../types/guild";
import {AxiosError, AxiosResponse} from "axios";
import {user} from "../types/user";

type getUrl =
  `/guilds/${string}`|
  `/guilds/${string}/roles`|
  `/guilds/${string}/members`|
  `/guilds/${string}/members/${string}`|
  `/guilds/${string}/invites`

type getGuildMembersInfoRes = {
  "id": string,
  "name": string,
  "nick": string,
  "joined_at": string,
  "roles": role[]
}

type deleteUrl =
  `/guilds/${string}/roles`|
  `/guilds/${string}/members/${string}`|
  `/guilds/${string}/invites/${string}`

type postUrl =
  `/guilds/${string}/roles`|
  `/guilds/${string}/invites`|
  `/guilds`
type postData = postCreateGuildRoleReq | postCreateInviteLinkReq | postCreateGuildReq

type postCreateGuildRoleReq = {
  "name": string,
  "permissions": string,
  "mentionable": boolean
}

type postCreateInviteLinkReq = {
  "guild_id": string,
  "channel_id": string,
  "expires_at": string
}

type postCreateGuildReq = {
  "guild_name": string,
  "guild_topics": string
}

type putUrl =
  `/guilds/${string}/members/${string}`|
  `/guilds?${string}/invites/${string}`

type putData = putGuildMemberInfoReq | putInviteLinkReq

type putGuildMemberInfoReq = {
  "nick": string
}

type putInviteLinkReq = {
  "expires_at": string
}

type patchUrl =
  `/guilds/${string}`|
  `/guilds/${string}/roles`

type patchData = patchGuildInfoReq | role

type patchGuildInfoReq = {
  "name": string,
  "icon": string,
  "owner_id": string
}

export class Guild {

  private isAxiosError = (error: any): error is AxiosError => {
    return !!error.isAxiosError;
  }

  private isInGuildID = (url: any): url is `/guilds/${string}` => {
    return !!url.isInGuildID;
  }

  private isInGuildIDRole = (url: any): url is `/guilds/${string}/roles` => {
    return !!url.isInGuildIDRole;
  }

  private isInGuildIDMember = (url: any): url is `/guilds/${string}/members` => {
    return !!url.isInGuildIDMember
  }

  private isInGuildIDMemberID = (url: any): url is `/guilds/${string}/members/${string}` => {
    return !!url.isInGuildIDMemberID
  }

  private isInGuildIDInvite = (url: any): url is `/guilds/${string}/invites` => {
    return !!url.isInGuildIDInvite
  }

  private isInGuildIDInviteID = (url: any): url is `/guilds/${string}/invites/${string}` => {
    return !!url.isInGuildIDInviteID
  }


  public get = async (url: getUrl) => {
    if (this.isInGuildID(url)) {
      try {
        const res:AxiosResponse<guild> = await client.get<guild>(url)
        return res.data
      } catch (e) {
        if(this.isAxiosError(e)){
          console.table(e)
        }
      }
    } else if (this.isInGuildIDRole(url)) {
      try {
        const res:AxiosResponse<role[]> = await client.get<role[]>(url)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)){
          console.table(e)
        }
      }
    } else if (this.isInGuildIDMember(url)) {
      try {
        const res:AxiosResponse<user[]> = await client.get<user[]>(url)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else if (this.isInGuildIDMemberID(url)) {
      try {
        const res:AxiosResponse<getGuildMembersInfoRes> = await client.get<getGuildMembersInfoRes>(url)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else if (this.isInGuildIDInvite(url)) {
      try {
        const res: AxiosResponse<inviteLink[]> = await client.get<inviteLink[]>(url)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else {
      console.error("no match endpoint [lib/guild.ts - get]")
    }
  }

  public delete = async (url: deleteUrl) => {
    if (this.isInGuildIDRole(url) || this.isInGuildIDMemberID(url) || this.isInGuildIDInviteID(url)) {
      try {
        const res:AxiosResponse = await client.delete(url)
        console.log(res.status, res.statusText)
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else if (this.isInGuildID(url)) {
      try {
        const res: AxiosResponse = await client.delete(url)
        console.log(res.status, res.statusText)
      } catch (e) {
        if (this.isAxiosError(e)){
          console.table(e)
        }
      }
    } else {
      console.error("no match endpoint [lib/guild.ts - delete]")
    }
  }

  public post = async (url: postUrl, data: postData) => {
    if (this.isInGuildIDRole(url)) {
      try {
        const res: AxiosResponse<role> = await client.post<role>(url, data)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else if (this.isInGuildIDInvite(url)) {
      try {
        const res: AxiosResponse<inviteLink> = await client.post<inviteLink>(url, data)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else if (url === "/guilds") {
      try {
        const res: AxiosResponse<guild> = await client.post<guild>(url, data)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else {
      console.error("no match endpoint [lib/guild.ts - post]")
    }
  }

  public put = async (url: putUrl, data:putData) => {
    if (this.isInGuildIDMemberID(url)) {
      try {
        const res: AxiosResponse = await client.put(url, data)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else if (this.isInGuildIDInviteID(url)) {
      try {
        const res: AxiosResponse<inviteLink> = await client.put<inviteLink>(url, data)
        return res.data
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    }
  }

  public patch = async (url: patchUrl, data:patchData) => {
    if (this.isInGuildID(url)) {
      try {
        const res: AxiosResponse = await client.patch(url, data)
        console.log(res.status, res.statusText)
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    } else if (this.isInGuildIDRole(url)) {
      try {
        const res: AxiosResponse = await client.patch(url, data)
        console.log(res.status, res.statusText)
      } catch (e) {
        if (this.isAxiosError(e)) {
          console.table(e)
        }
      }
    }  else {
      console.error("no match endpoint [lib/guild.ts - patch]")
    }
  }
}
