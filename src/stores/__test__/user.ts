import { user } from "../../types/user";
import { Context, createContext } from "react";

export const TestUserData: Context<user> = createContext<user>({
    id: "0",
    name: "ゼっちゃん",
    avatar: "",
    bot: false,
    state: 0
  }
)
