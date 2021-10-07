import { myInfo, User } from "../types/user";
import { Dispatch, Context, createContext, useReducer, Reducer } from "react";

type stateType = {
  user: myInfo;
  nowMember: User[];
};

type actionType =
  | {
      type: "set";
      newData: myInfo;
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
  userState: stateType;
  userDispatch: Dispatch<actionType>;
};

const reducer: Reducer<stateType, actionType> = (state: stateType, action: actionType) => {
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

type useUserStateType = () => {
  userState: stateType;
  userDispatch: Dispatch<actionType>;
};

export const useUserSD: useUserStateType = () => {
  const [userState, userDispatch] = useReducer(reducer, {
    user: {} as myInfo,
    nowMember: [] as User[],
  });
  return { userState, userDispatch };
};

export const userContext: Context<UserContext> = createContext<UserContext>({
  userState: {
    user: {} as myInfo,
    nowMember: [] as User[],
  },
  userDispatch: () => {},
});
