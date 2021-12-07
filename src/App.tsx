import * as React from "react";

import AuthenticatedApp from "AuthenticatedApp";
import UnauthenticatedApp from "UnauthenticatedApp";
import { useAuth } from "./context/authContext";
function App() {
  const { user } = useAuth();
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
