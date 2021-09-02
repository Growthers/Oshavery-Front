import axios, {AxiosResponse} from "axios";
import {user} from "../types/user";

type patchUpdateAUserInfoReq = {
  "name": string
}

type patchUpdateAUserInfoRes = {
  "user_id": string,
  "user_name": string,
  "user_avatar": string,
  "bot": boolean
}

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

export class User {
  public static getAUserInfo: (userID:number) => Promise<AxiosResponse<user>> =
    (userID) => axios.get<user>(`${process.env.url}/users/${userID}`)

  public static patchUpdateAUserInfo: (userID: number, newData:patchUpdateAUserInfoReq) => Promise<patchUpdateAUserInfoRes> =
    (userID,newData) => axios.patch(
      `${process.env.url}/users/${userID}`,
      newData
    )

  public static postCreateAUser: (newData:)

  public static getUsersInfo: () => Promise<user[]> =
    () => axios.get(`${process.env.url}/users`)

}



const func = async () => {
  try {
    await User.getAUserInfo(1)
  }
}
