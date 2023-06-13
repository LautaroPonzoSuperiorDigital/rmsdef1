import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [notification, setNotification] = useState("");

  const updateToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("ACCESS_TOKEN", newToken);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const updateNotification = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken: updateToken,
        notification,
        setNotification: updateNotification,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
