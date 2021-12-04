import { FC, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import client from "./client";
import { Message } from "../types/message";
import { messagesContext } from "../stores/message";
import { User } from "../types/user";
import { userContext } from "../stores/user";

type WebSocket = {
  type: string;
  body: {
    id?: string;
    guild_id?: string;
    channel_id?: string;
    message_id?: string;
    member_id?: string;
  };
};

const WebSocketController: FC = () => {
  const router = useRouter();
  const { channelID } = router.query;

  const { userDispatch } = useContext(userContext);
  const { messagesDispatch } = useContext(messagesContext);

  const socket =
    typeof window !== "undefined" && process.env.NEXT_PUBLIC_WSENDPOINT !== undefined
      ? new WebSocket(process.env.NEXT_PUBLIC_WSENDPOINT)
      : undefined;

  useEffect(() => {
    if (socket == null) return;

    socket.onmessage = (event: MessageEvent<WebSocket>) => {
      switch (event.data.type) {
        case "USER_JOINED":
          if (event.data.body.guild_id !== undefined && event.data.body.member_id !== undefined) {
            client
              .get<User[]>(`/guilds/${event.data.body.guild_id}/members`)
              .then((res) => {
                if (event.data.body.guild_id !== undefined) {
                  userDispatch({
                    type: "setMember",
                    newData: res.data,
                  });
                }
              })
              .catch(() => {});
          }
          break;

        case "USER_UPDATED":
          break;

        case "USER_STATUS_UPDATED":
          break;

        case "CHANNEL_CREATED":
          break;

        case "CHANNEL_UPDATED":
          break;

        case "CHANNEL_DELETED":
          break;

        case "MESSAGE_CREATED":
          if (
            channelID !== undefined &&
            channelID === event.data.body.channel_id &&
            event.data.body.message_id !== undefined
          ) {
            client
              .get<Message>(`/channels/${event.data.body.channel_id}/messages/${event.data.body.message_id}`)
              .then((res) => {
                messagesDispatch({
                  type: "new",
                  newData: res.data,
                });
              })
              .catch(() => {});
          }
          break;

        case "MESSAGE_UPDATED":
          break;

        case "MESSAGE_DELETED":
          if (
            event.data.body.guild_id !== undefined &&
            event.data.body.channel_id !== undefined &&
            event.data.body.message_id !== undefined &&
            channelID === event.data.body.channel_id &&
            channelID !== undefined
          ) {
            messagesDispatch({
              type: "delete",
              message_id: event.data.body.message_id,
            });
          }
          break;

        case "EMOJI_CREATED":
          break;

        case "EMOJI_UPDATED":
          break;

        case "EMOJI_DELETED":
          break;

        case "GUILD_CREATED":
          break;

        case "GUILD_UPDATED":
          break;

        case "GUILD_DELETED":
          break;

        default:
      }
    };
  });

  return <></>;
};

export default WebSocketController;
