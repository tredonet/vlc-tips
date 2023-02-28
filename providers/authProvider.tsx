import React, { ComponentProps, createContext, Dispatch, useEffect, useState } from "react";

export type AuthContextProps = {
  token?: string;
  setToken: (token: string) => void;
};

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<ComponentProps<"div">> = ({ children }) => {
  const [token, setToken] = useState<string>("");

  const values = {
    token,
    setToken,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
