import { createContext } from "react";

const LoginContext = createContext({
  user: null,
  dispatch: () => {},
});

export default LoginContext;
