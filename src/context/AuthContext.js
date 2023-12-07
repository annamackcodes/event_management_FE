import React, { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SIGN_IN":
      localStorage.setItem("token", action.payload.token);
      return { isAuthenticated: true };
    case "SIGN_OUT":
      localStorage.removeItem("token");
      return { isAuthenticated: false };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth, AuthContext };
