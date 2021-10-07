import { Message } from "../types/message";
import { Context, createContext, Dispatch, Reducer, useReducer } from "react";

type stateType = {
  messages: Message[];
};

type actionType =
  | {
      type: "set";
      newData: Message[];
    }
  | {
      type: "load";
      newData: Message[];
    }
  | {
      type: "new";
      newData: Message;
    }
  | {
      type: "delete";
      message_id: string;
    };

type messageContext = {
  messagesState: stateType;
  messagesDispatch: Dispatch<actionType>;
};

const reducer: Reducer<stateType, actionType> = (state: stateType, action: actionType) => {
  switch (action.type) {
    case "set":
      return { messages: action.newData };

    case "load":
      return { messages: state.messages.concat(action.newData) };

    case "new":
      state.messages.unshift(action.newData);
      return state;

    case "delete":
      state.messages.splice(
        state.messages.findIndex((item) => item.id === action.message_id),
        1,
      );
      return state;

    default:
      return state;
  }
};

type useMessagesSDType = () => {
  messagesState: stateType;
  messagesDispatch: Dispatch<actionType>;
};

export const useMessageSD: useMessagesSDType = () => {
  const [messagesState, messagesDispatch] = useReducer(reducer, {} as stateType);
  return { messagesState, messagesDispatch };
};

export const messagesContext: Context<messageContext> = createContext<messageContext>({} as messageContext);
