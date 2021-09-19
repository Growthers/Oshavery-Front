import { myInfo, user } from "../types/user";
import { Dispatch, Context, createContext, useReducer, Reducer } from "react";
import { preMember, testMyInfo } from "./__test__/user";

type stateType = {
  user: myInfo;
  nowMember: user[];
};

type actionType =
  | {
      type: "set";
      newData: myInfo;
    }
  | {
      type: "setMember",
      newData: user[]
    }
  | {
      type: "USER_JOINED";
      guild: string;
      newData: user[];
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
        nowMember: action.newData
      }

    case "USER_JOINED":
      return {
        user: state.user,
        nowMember: action.newData,
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
  const [userState, userDispatch] = useReducer(
    reducer,
    {
      user: testMyInfo,
      nowMember: preMember
    });
  return { userState, userDispatch };
};

export const userContext: Context<UserContext> = createContext<UserContext>({
  userState: {
    user: {} as myInfo,
    nowMember: [] as user[]
  },
  userDispatch: () => {},
});
