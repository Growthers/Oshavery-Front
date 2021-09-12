import {FC, useContext, useEffect} from "react";
import {client} from "./client";
import {message} from "../types/message";
import {useRouter} from "next/router";
import {messagesContext} from "../stores/message";

type ws = {
  type : string
  body : {
    id?: string
    channelID?: string
    messageID: string
  }
}

const WebSocketController: FC = () => {
  const router = useRouter()
  const {channelID} = router.query

  const {messagesDispatch} = useContext(messagesContext)


  const socket = typeof window !== "undefined" ? new WebSocket(process.env.NEXT_PUBLIC_WSENDPOINT!) : null;
  useEffect(() => {
    if (socket == null) return

    socket.onmessage = (event:MessageEvent<ws>) => {
      console.log(event)


      switch (event.type){
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
          /*
          if (channelID != undefined && channelID === event.){
            client.get<message>(`/channels/${event.data.body.channelID}/messages/${event.data.body.id}`)
              .then(res => {
                messagesDispatch({
                  type: "new",
                  newData: res.data
                })
              })
              .catch(error => {
                console.log(error)
              })
          }*/
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
