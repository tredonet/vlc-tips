import React, { ComponentProps, createContext, Dispatch, useEffect, useState } from "react";

export type AuthContextProps = {
  token: string;
  username: string;
  setToken: (token: string) => void;
  setUsername: (username: string) => void;
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<ComponentProps<"div">> = ({ children }) => {
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const values = {
    token,
    username,
    setToken,
    setUsername,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
