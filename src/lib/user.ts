import axios from "axios";
import {user} from "../types/user";

export const getAUserInfo = async (userID:number) => {
  try {
    const response = await axios.get<user>("/users/" + userID.toString())
  } catch (error) {
    alert(error);
  }
}
