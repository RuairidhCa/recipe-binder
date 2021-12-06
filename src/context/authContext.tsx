import * as React from "react";

interface IAuthContext {
  user: { username: string; id: number; token: string } | null;
  login: () => void;
  logout: () => void;
}
const AuthContext = React.createContext<IAuthContext | null>(null);
AuthContext.displayName = "AuthContext";

function AuthProvider(props: React.PropsWithChildren<{}>) {
  type State = {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: { username: string; id: number; token: string } | any;
  };

  type Action = {
    type: string;
    payload?: any;
  };

  const initialState: State = {
    isAuthenticated: false,
    isLoading: false,
    user: localStorage.getItem("user"),
  };

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case "LOGIN_REQUEST":
        return {
          ...state,
          isLoading: true,
        };
      case "LOGIN_SUCCESS":
        localStorage.setItem("user", JSON.stringify(action.payload));
        return {
          ...state,
          isLoading: false,
          isAuthenticated: true,
          user: action.payload,
        };
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { user, isLoading, isAuthenticated } = state;

  const login = () => {
    console.log("login");
    dispatch({ type: "LOGIN_REQUEST" });
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "test2", password: "test2" }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);

        dispatch({ type: "LOGIN_SUCCESS", payload: data });
      });
  };

  const logout = () => {
    console.log("logout");
  };
  const value = { user, isLoading, isAuthenticated, login, logout };
  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
