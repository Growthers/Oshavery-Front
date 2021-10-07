import { Context, createContext, Dispatch, Reducer, useReducer } from "react";
import { Message } from "../types/message";

type StateType = {
  messages: Message[];
};

type ActionType =
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

type MessageContext = {
  messagesState: StateType;
  messagesDispatch: Dispatch<ActionType>;
};

const reducer: Reducer<StateType, ActionType> = (state: StateType, action: ActionType) => {
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

type UseMessagesSDType = () => {
  messagesState: StateType;
  messagesDispatch: Dispatch<ActionType>;
};

export const useMessageSD: UseMessagesSDType = () => {
  const [messagesState, messagesDispatch] = useReducer(reducer, {} as StateType);
  return { messagesState, messagesDispatch };
};

export const messagesContext: Context<MessageContext> = createContext<MessageContext>({} as MessageContext);
