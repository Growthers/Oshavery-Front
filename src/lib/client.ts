import axios, {AxiosInstance} from "axios";


const clinet: AxiosInstance = axios.create({
  baseURL: process.env.url
  headers
})



export class Client{
  private parseURL:(path: string) => string =
    (path => `${baseURL}${path}`)


}
