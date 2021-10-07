import React, { FC } from "react";
import { userContext, useUserSD } from "./user";
import { messagesContext, useMessageSD } from "./message";

const ContextProvider: FC = ({ children }) => {
  const userSD = useUserSD();

  const messagesSD = useMessageSD();

  return (
    <userContext.Provider value={userSD}>
      <messagesContext.Provider value={messagesSD}>{children}</messagesContext.Provider>
    </userContext.Provider>
  );
};

export default ContextProvider;
