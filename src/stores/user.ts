import { Dispatch, Context, createContext, useReducer, Reducer } from "react";
import { MyInfo, User } from "../types/user";

type StateType = {
  user: MyInfo;
  nowMember: User[];
};

type ActionType =
  | {
      type: "set";
      newData: MyInfo;
    }
  | {
      type: "setMember";
      newData: User[];
    }
  | {
      type: "USER_JOINED";
      guild: string;
      newData: User;
    }
  | {
      type: "MESSAGE_CREATED";
      guild: string;
      channel: string;
      message: string;
    };

type UserContext = {
  userState: StateType;
  userDispatch: Dispatch<ActionType>;
};

const reducer: Reducer<StateType, ActionType> = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "set":
      return {
        user: action.newData,
        nowMember: state.nowMember,
      };

    case "setMember":
      return {
        user: state.user,
        nowMember: action.newData,
      };

    case "USER_JOINED":
      state.nowMember.push(action.newData);
      return {
        user: state.user,
        nowMember: state.nowMember,
      };

    default:
      return state;
  }
};

type UseUserStateType = () => {
  userState: StateType;
  userDispatch: Dispatch<ActionType>;
};

export const useUserSD: UseUserStateType = () => {
  const [userState, userDispatch] = useReducer(reducer, {
    user: {} as MyInfo,
    nowMember: [] as User[],
  });
  return { userState, userDispatch };
};

export const userContext: Context<UserContext> = createContext<UserContext>({
  userState: {
    user: {} as MyInfo,
    nowMember: [] as User[],
  },
  userDispatch: () => {},
});
