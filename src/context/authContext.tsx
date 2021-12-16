import * as React from "react";

interface IAuthContext {
  user: { username: string; id: number; token: string } | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: { message: string };
  login: ({ username, password }: { [key: string]: string }) => void;
  logout: () => void;
}
const AuthContext = React.createContext<IAuthContext | null>(null);
AuthContext.displayName = "AuthContext";

function AuthProvider(props: React.PropsWithChildren<{}>) {
  type State = {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: { username: string; id: number; token: string } | null;
    error: any;
  };

  type Action = {
    type: string;
    payload?: any;
  };

  const storedUser = localStorage.getItem("user") || null;
  const initialState: State = {
    isAuthenticated: false,
    isLoading: false,
    user: storedUser ? JSON.parse(storedUser) : null,
    error: null,
  };

  function reducer(state: State, action: Action) {
    switch (action.type) {
      case "LOGIN_REQUEST":
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case "LOGIN_SUCCESS":
        localStorage.setItem("user", JSON.stringify(action.payload));
        return {
          ...state,
          isLoading: false,
          isAuthenticated: true,
          user: action.payload,
          error: null,
        };
      case "LOGIN_FAIL":
        return {
          ...state,
          isLoading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
      case "LOGOUT":
        localStorage.removeItem("user");
        return {
          ...state,
          isLoading: false,
          isAuthenticated: false,
          user: null,
          error: null,
        };
      default:
        throw new Error();
    }
  }
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { user, isLoading, isAuthenticated, error } = state;

  const login = async ({ username, password }: { [key: string]: string }) => {
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
      } else {
        console.log("login fail");
        dispatch({ type: "LOGIN_FAIL", payload: data });
      }
    } catch (error) {
      console.error("FAIL");
      console.error(error);

      dispatch({ type: "LOGIN_FAIL" });
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const value = { user, isLoading, isAuthenticated, error, login, logout };
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
