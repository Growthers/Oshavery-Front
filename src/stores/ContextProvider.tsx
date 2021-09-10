import {userContext, useUserSD} from "./user";
import React, { FC } from "react";
import {messagesContext, useMessageSD} from "./message";

const ContextProvider: FC = (props ) => {

  const userSD = useUserSD()

  const messagesSD = useMessageSD()

  return (
    <userContext.Provider value={userSD}>
      <messagesContext.Provider value={messagesSD}>
        {props.children}
      </messagesContext.Provider>
    </userContext.Provider>
  )
}

export default ContextProvider
