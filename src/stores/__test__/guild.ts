import { guild } from "../../types/guild";
import { Context, createContext } from "react";

export const TestWatchingGuild: Context<string> = createContext<string>("server_one");

export const TestGuildData: Context<guild[]> = createContext<guild[]>([
  {
    id: "server_one",
    name: "鯖1",
    topic: "星1とは違います",
    icon: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    channels: [
      {
        id: "a",
        name: "spaceA",
        topics: "this is A",
        type: "text",
        position: 0,
        latest_message_id: "aaa",
        created_at: "aaa",
        updated_at: "",
        deleted_at: "",
        guildId: "server_one",
      },
      {
        id: "b",
        name: "spaceB",
        topics: "this is B",
        type: "text",
        position: 1,
        latest_message_id: "bbb",
        created_at: "bbb",
        updated_at: "",
        deleted_at: "",
        guildId: "server_one",
      },
    ],
  },
  {
    id: "server_two",
    name: "鯖2",
    topic: "星2とは違います",
    icon: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",

    channels: [
      {
        id: "c",
        name: "spaceC",
        topics: "this is C",
        type: "text",
        position: 0,
        latest_message_id: "ccc",
        created_at: "ccc",
        updated_at: "",
        deleted_at: "",
        guildId: "server_two",
      },
      {
        id: "d",
        name: "spaceD",
        topics: "this is D",
        type: "text",
        position: 1,
        latest_message_id: "ddd",
        created_at: "ddd",
        updated_at: "",
        deleted_at: "",
        guildId: "server_two",
      },
    ],
  },
]);
