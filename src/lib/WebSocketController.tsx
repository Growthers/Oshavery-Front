import {FC, useEffect} from "react";
import {client} from "./client";

const WebSocketController: FC = () => {
  const socket = new WebSocket(process.env.NEXT_PUBLIC_WSENDPOINT!)
  useEffect(() => {
    socket.onmessage = (event:MessageEvent<{type:string,body:{id:string}}>) => {

      switch (event.data.type){
        case "USER_JOINED":
          break

        case "USER_UPDATED":
          break

        case "USER_STATUS_UPDATED":
          break

        case "CHANNEL_CREATED":
          break

        case "CHANNEL_UPDATED":
          break

        case "CHANNEL_DELETED":
          break

        case "MESSAGE_CREATED":
          client.get(`/channel/${"aaaaa"}/messages/${event.data.body.id}`)
            .then(res => {

            })
          break

        case "MESSAGE_UPDATED":
          break

        case "MESSAGE_DELETED":
          break

        case "EMOJI_CREATED":
          break

        case "EMOJI_UPDATED":
          break

        case "EMOJI_DELETED":
          break

        case "GUILD_CREATED":
          break

        case "GUILD_UPDATED":
          break

        case "GUILD_DELETED":
          break

        default:
      }

    }

    return () => {
      socket.close()
    }
  })


  return <></>
}

export default WebSocketController
