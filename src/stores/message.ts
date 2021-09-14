import { message } from "../types/message";
import { Context, createContext, Dispatch, Reducer, useReducer } from "react";

type stateType = {
  messages: message[];
};

type actionType =
  | {
      type: "set";
      newData: message[];
    }
  | {
      type: "load";
      newData: message[];
    }
  | {
      type: "new";
      newData: message;
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
