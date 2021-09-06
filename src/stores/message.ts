import { message } from "../types/message";
import {Context, createContext, Dispatch, Reducer, useReducer} from "react";

type stateType = {
  messages: message[] | undefined
}

type actionType = |
  {
    type: "set"
    newData: message[]
  } |
  {
    type: "load"
    newData: message[]
  } |
  {
    type: "new"
    newData: message
  }

type messageContext = {
    messagesState: stateType
    messagesDispatch: Dispatch<actionType>
}

const reducer: Reducer<stateType, actionType> = (state: stateType, action: actionType ) => {
  switch (action.type) {
    case "set":
      return {messages: action.newData}
    case "load":
      if (state.messages != undefined)
        action.newData.concat(state.messages)
        return {messages: action.newData}
    case "new":
      if (state.messages != undefined)
        state.messages.push(action.newData)
        return state
    default:
      return state
  }
}

type useMessagesSDType = () => {
  messagesState: stateType,
  messagesDispatch: Dispatch<actionType>
}

export const useMessageSD: useMessagesSDType = () => {
  const [messagesState, messagesDispatch] = useReducer(reducer, {messages: undefined})
  return {messagesState, messagesDispatch}
}

export const messagesContext: Context<messageContext> = createContext<messageContext>({} as messageContext)
